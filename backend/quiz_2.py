from typing import Dict, List

from pydantic import BaseModel


class Question(BaseModel):
    question: str
    options: List[str]
    answer: str


# NOTE: this is a minimal second quiz variant — only one question so far.
# It's wired end-to-end (backend route + frontend page) but isn't linked
# from primary navigation; reachable at /quiz_2.
questions = [
    {
        "question": "What does DBMS stand for?",
        "options": ["Data Boxing Management System", "Database Management System", "Data Backup Management System", "None of the above"],
        "answer": "Database Management System"
    },
]


def get_quiz():
    return questions


class QuizAnswers(BaseModel):
    answers: Dict[int, str]  # question index: selected option


def evaluate_quiz(quiz_answers: QuizAnswers):
    correct_count = 0
    for idx, answer in quiz_answers.answers.items():
        if questions[idx]["answer"] == answer:
            correct_count += 1
    total_questions = len(questions)
    return {"correct": correct_count, "total": total_questions, "score": correct_count / total_questions * 100 if total_questions else 0}
