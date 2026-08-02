import json
import os
from datetime import datetime

import matplotlib.pyplot as plt
from fastapi.responses import FileResponse
from fastapi import HTTPException

BASE_DIR = os.path.dirname(os.path.realpath(__file__))
QUIZ_RESULTS_PATH = os.path.join(BASE_DIR, "database", "quiz_results.json")
PLOT_IMAGE_PATH = os.path.join(BASE_DIR, "database", "quiz_scores_plot.png")


def save_plot_scores():
    try:
        with open(QUIZ_RESULTS_PATH, "r") as file:
            scores = json.load(file)
    except FileNotFoundError:
        raise HTTPException(status_code=404, detail="Score file not found. Please take some quizzes first.")

    if not scores:
        raise HTTPException(status_code=404, detail="No scores to plot.")

    score_values = [score["score"] for score in scores]
    timestamps = [datetime.fromisoformat(score["timestamp"]).strftime('%Y-%m-%d %H:%M:%S') for score in scores]

    plt.figure(figsize=(10, 6))
    plt.plot(timestamps, score_values, marker='o', linestyle='-', color='b')
    plt.title('Quiz Scores Over Time')
    plt.xlabel('Attempt Timestamp')
    plt.ylabel('Score (%)')
    plt.xticks(rotation=45)
    plt.tight_layout()
    plt.savefig(PLOT_IMAGE_PATH)
    plt.close()


def get_plot_scores():
    save_plot_scores()
    if not os.path.exists(PLOT_IMAGE_PATH):
        raise HTTPException(status_code=404, detail="Plot image not found.")
    return FileResponse(PLOT_IMAGE_PATH)


def get_latest_quiz_result():
    try:
        with open(QUIZ_RESULTS_PATH, "r") as file:
            scores = json.load(file)
    except FileNotFoundError:
        return {"message": "No quiz results found."}

    if not scores:
        return {"message": "No quiz results available yet."}

    latest_score = scores[-1]
    score_value = latest_score['score']

    if score_value <= 40:
        message = f"You scored {score_value}% on your last quiz. You seem to be unfamiliar with DBMS."
    elif 40 < score_value <= 70:
        message = f"You scored {score_value}% on your last quiz. You seem to be unfamiliar with SQL and lacking clarity on the concept of keys"
    else:
        message = f"You scored {score_value}% on your last quiz. You seem to be good with the concepts of DBMS. Lets practice a bit more to master it😎 "

    return {"message": message, "score": score_value}
