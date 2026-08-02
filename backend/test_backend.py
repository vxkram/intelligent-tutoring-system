import json
import sys
import os

import pytest
from fastapi.testclient import TestClient

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

import quiz_1
import quiz_2
import results_1
import content_rec
import pdf_summarizer
import main


# --- quiz_1.py -------------------------------------------------------------

@pytest.fixture
def question_bank(tmp_path, monkeypatch):
    questions = [
        {"question": "Q1", "options": ["a", "b"], "answer": "a"},
        {"question": "Q2", "options": ["a", "b"], "answer": "b"},
        {"question": "Q3", "options": ["a", "b"], "answer": "a"},
    ]
    bank_path = tmp_path / "question_bank.json"
    bank_path.write_text(json.dumps(questions))
    monkeypatch.setattr(quiz_1, "QUESTION_BANK_PATH", bank_path)
    return questions


@pytest.fixture
def quiz_results_path(tmp_path, monkeypatch):
    path = tmp_path / "quiz_results.json"
    monkeypatch.setattr(quiz_1, "QUIZ_RESULTS_PATH", path)
    monkeypatch.setattr(results_1, "QUIZ_RESULTS_PATH", path)
    return path


def test_load_questions_missing_file_raises_404(tmp_path, monkeypatch):
    monkeypatch.setattr(quiz_1, "QUESTION_BANK_PATH", tmp_path / "does_not_exist.json")
    with pytest.raises(Exception) as exc_info:
        quiz_1.load_questions()
    assert "404" in str(exc_info.value) or "not found" in str(exc_info.value).lower()


def test_calculate_score_only_counts_answered_questions(question_bank):
    # Only 2 of the 3 bank questions were actually shown/answered.
    user_answers = {"Q1": "a", "Q2": "wrong"}
    score = quiz_1.calculate_score(user_answers, question_bank)
    assert score == 50.0  # 1/2, not 1/3 and not the old hardcoded /10


def test_calculate_score_perfect_on_partial_sample(question_bank):
    user_answers = {"Q1": "a"}
    score = quiz_1.calculate_score(user_answers, question_bank)
    assert score == 100.0


def test_save_score_persists_details(question_bank, quiz_results_path):
    user_answers = {"Q1": "a", "Q2": "b"}
    quiz_1.save_score(user_answers, question_bank[:2], 100.0)
    saved = json.loads(quiz_results_path.read_text())
    assert len(saved) == 1
    assert saved[0]["score"] == 100.0
    assert len(saved[0]["details"]) == 2


# --- quiz_2.py ---------------------------------------------------------------

def test_quiz_2_evaluate_scores_correctly():
    answers = quiz_2.QuizAnswers(answers={0: "Database Management System"})
    result = quiz_2.evaluate_quiz(answers)
    assert result["correct"] == 1
    assert result["score"] == 100.0


# --- results_1.py ------------------------------------------------------------

def test_get_latest_quiz_result_no_file(quiz_results_path):
    result = results_1.get_latest_quiz_result()
    assert result["message"] == "No quiz results found."


def test_get_latest_quiz_result_includes_score(quiz_results_path):
    quiz_results_path.write_text(json.dumps([
        {"timestamp": "2026-01-01T00:00:00", "score": 85.0, "details": []}
    ]))
    result = results_1.get_latest_quiz_result()
    assert result["score"] == 85.0  # regression test: this key used to be missing entirely
    assert "85.0" in result["message"]


# --- content_rec.py: the adaptive-recommendation tiering --------------------

@pytest.mark.asyncio
async def test_recommend_resources_beginner_tier(quiz_results_path):
    quiz_results_path.write_text(json.dumps([
        {"timestamp": "2026-01-01T00:00:00", "score": 20.0, "details": []}
    ]))
    resources = await content_rec.recommend_resources()
    assert resources == content_rec.categorized_resources["Beginner"]


@pytest.mark.asyncio
async def test_recommend_resources_advanced_tier(quiz_results_path):
    quiz_results_path.write_text(json.dumps([
        {"timestamp": "2026-01-01T00:00:00", "score": 95.0, "details": []}
    ]))
    resources = await content_rec.recommend_resources()
    assert resources == content_rec.categorized_resources["Advanced"]


# --- pdf_summarizer.py --------------------------------------------------------

def test_create_summary_pdf_handles_unicode_bullets(tmp_path):
    # Regression test: real extracted PDF text often has bullets/smart quotes
    # that crash fpdf2's core "Arial" font if not sanitized first.
    output_path = tmp_path / "summary.pdf"
    pdf_summarizer.create_summary_pdf("• First point\n‘quoted’ text", str(output_path))
    assert output_path.exists()
    assert output_path.stat().st_size > 0


def test_summarize_text_returns_a_string():
    text = "This is sentence one. This is sentence two. This is sentence three."
    summary = pdf_summarizer.summarize_text(text, sentence_count=2)
    assert isinstance(summary, str)
    assert len(summary) > 0


# --- main.py: integration-level smoke test via TestClient -------------------

@pytest.fixture
def client(question_bank, quiz_results_path):
    return TestClient(main.app)


def test_quiz_get_returns_questions(client):
    response = client.get("/quiz/")
    assert response.status_code == 200
    assert len(response.json()) > 0


def test_quiz_post_and_recommend_resources_reflect_score(client, question_bank):
    all_correct = {q["question"]: q["answer"] for q in question_bank}
    response = client.post("/quiz/", json={"answers": all_correct})
    assert response.status_code == 200
    assert "100.0%" in response.json()["message"]

    recs = client.get("/recommend-resources/")
    assert recs.status_code == 200
    assert recs.json() == [r.model_dump() for r in content_rec.categorized_resources["Advanced"]]


def test_quiz_2_endpoints(client):
    response = client.get("/quiz_2/")
    assert response.status_code == 200
    questions = response.json()
    assert len(questions) == 1
