import json
import os
import random
from datetime import datetime
from pathlib import Path
from typing import Dict, List

from fastapi import HTTPException
from pydantic import BaseModel

BASE_DIR = os.path.dirname(os.path.realpath(__file__))
QUESTION_BANK_PATH = Path(BASE_DIR) / "database" / "question_bank_dbms.json"
QUIZ_RESULTS_PATH = Path(BASE_DIR) / "database" / "quiz_results.json"


class Question(BaseModel):
    question: str
    options: List[str]
    answer: str


class QuizSubmission(BaseModel):
    answers: Dict[str, str]


def load_questions() -> List[Dict]:
    if not QUESTION_BANK_PATH.exists():
        raise HTTPException(status_code=404, detail="Question bank not found")
    with QUESTION_BANK_PATH.open("r") as file:
        return json.load(file)


async def get_quiz_questions():
    questions = load_questions()
    return random.sample(questions, min(len(questions), 10))


def calculate_score(user_answers: Dict[str, str], questions: List[Dict]) -> float:
    # `questions` is the full question bank, but a quiz attempt only ever shows
    # a random sample of it (see get_quiz_questions). Score against just the
    # questions the user was actually asked — otherwise every score is capped
    # at (sample size / bank size) * 100 no matter how well they do.
    answered_questions = [q for q in questions if q["question"] in user_answers]
    if not answered_questions:
        return 0
    correct_answers = sum(1 for q in answered_questions if user_answers.get(q["question"]) == q["answer"])
    return correct_answers / len(answered_questions) * 100


def save_score(user_answers: Dict[str, str], questions: List[Dict], score: float):
    # Load existing quiz results if the file exists
    if QUIZ_RESULTS_PATH.exists():
        with QUIZ_RESULTS_PATH.open("r") as file:
            quiz_results = json.load(file)
    else:
        quiz_results = []

    # Prepare the new quiz result entry
    new_quiz_result = {
        "timestamp": datetime.now().isoformat(),
        "score": score,
        "details": []
    }

    # Add each question and the user's answer to the result entry
    for question in questions:
        new_quiz_result["details"].append({
            "question": question["question"],
            "correct_answer": question["answer"],
            "user_answer": user_answers.get(question["question"], "No Answer")
        })

    # Append the new quiz result to the list and save it back to the file
    quiz_results.append(new_quiz_result)
    with QUIZ_RESULTS_PATH.open("w") as file:
        json.dump(quiz_results, file, indent=4)
