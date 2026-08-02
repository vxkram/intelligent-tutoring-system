import os

from fastapi import FastAPI, HTTPException
from fastapi.responses import FileResponse
from fastapi.middleware.cors import CORSMiddleware
from typing import List
from fastapi.staticfiles import StaticFiles

from quiz_1 import get_quiz_questions, QuizSubmission, Question, load_questions, calculate_score, save_score
from quiz_2 import get_quiz, evaluate_quiz, QuizAnswers, Question as Quiz2Question
from results_1 import get_plot_scores, get_latest_quiz_result
from content_rec import recommend_resources, Resource
from pdf_summarizer import list_pdf_files, extract_text_from_pdf, summarize_text, create_summary_pdf

current_directory = os.path.dirname(os.path.realpath(__file__))
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Adjust for production
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["*"],
)

app.mount("/static", StaticFiles(directory=os.path.join(current_directory, "static")), name="static")

@app.get("/quiz/", response_model=List[Question])
async def quiz_endpoint():
    # Fetch and return quiz questions
    return await get_quiz_questions()


@app.post("/quiz/")
async def submit_quiz(submission: QuizSubmission):
    questions = load_questions()
    score = calculate_score(submission.answers, questions)
    save_score(submission.answers, questions, score)
    return {"message": f"You scored {score}% on this quiz."}


@app.get("/plot-scores/")
async def plot_scores_endpoint():
    return get_plot_scores()

@app.get("/latest-quiz-result/")
async def latest_quiz_result_endpoint():
    return get_latest_quiz_result()

@app.get("/recommend-resources/", response_model=List[Resource])
async def recommend_resources_wrapper():
    # Simply call the recommend_resources function from content_rec.py
    return await recommend_resources()

# Quiz 2 Endpoints
@app.get("/quiz_2/", response_model=list[Quiz2Question])
async def quiz_2_endpoint():
    return get_quiz()

@app.post("/quiz_2/evaluate/", response_model=dict)
async def evaluate_quiz_2(quiz_answers: QuizAnswers):
    return evaluate_quiz(quiz_answers)


@app.get("/pdfs/")
def get_pdfs():
    """Endpoint to list available PDFs."""
    return list_pdf_files()


@app.get("/summarize-pdf/{pdf_id}")
def get_pdf_summary(pdf_id: int):
    pdfs = list_pdf_files()
    pdf = next((p for p in pdfs if p['id'] == pdf_id), None)
    if pdf is None:
        raise HTTPException(status_code=404, detail="PDF not found")
    text = extract_text_from_pdf(pdf['file_path'])
    summary = summarize_text(text)
    output_path = os.path.join(current_directory, f"temp_summary_{pdf_id}.pdf")
    create_summary_pdf(summary, output_path)
    return FileResponse(output_path, media_type='application/pdf', filename=os.path.basename(output_path))

@app.get("/download-pdf/{pdf_id}")
def download_pdf(pdf_id: int):
    """Endpoint to download a PDF by its ID."""
    pdfs = list_pdf_files()  # Assuming this returns a list of all PDFs with 'id' and 'file_path'
    pdf = next((p for p in pdfs if p['id'] == pdf_id), None)
    if pdf is None:
        raise HTTPException(status_code=404, detail="PDF not found")
    return FileResponse(pdf['file_path'], media_type='application/pdf', filename=pdf['title'])


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
