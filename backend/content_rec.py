from fastapi import HTTPException
from pydantic import BaseModel

from results_1 import get_latest_quiz_result


class Resource(BaseModel):
    title: str
    url: str


categorized_resources = {
    "Beginner": [
        Resource(title="Introduction to DBMS", url="https://youtu.be/X7v0O8yiUuY"),
        Resource(title="DBMS Tutorial GeeksforGeeks", url="https://www.geeksforgeeks.org/dbms/")
    ],
    "Intermediate": [
        Resource(title="Normalization in DBMS", url="https://youtu.be/5nGC4fyFPes"),
        Resource(title="Understanding SQL", url="https://youtu.be/wmiDdBG-yP4")
    ],
    "Advanced": [
        Resource(title="Advanced Database Concepts", url="https://youtu.be/ABwD8IYByfk"),
        Resource(title="SQL Queries Tutorial", url="https://youtu.be/0buKQHokLK8")
    ]
}


async def recommend_resources():
    latest_result = get_latest_quiz_result()
    if not latest_result:
        raise HTTPException(status_code=404, detail="Latest quiz result not found.")

    score = latest_result["score"] if "score" in latest_result else 0

    if score <= 40:
        recommended_level = "Beginner"
    elif 40 < score <= 70:
        recommended_level = "Intermediate"
    else:
        recommended_level = "Advanced"

    return categorized_resources[recommended_level]
