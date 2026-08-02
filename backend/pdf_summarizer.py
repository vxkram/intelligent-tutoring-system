import heapq
import os
from collections import defaultdict

import fitz  # PyMuPDF
import nltk
from fpdf import FPDF
from nltk.corpus import stopwords
from nltk.tokenize import sent_tokenize, word_tokenize

BASE_DIR = os.path.dirname(os.path.realpath(__file__))
PDF_DIRECTORY = os.path.join(BASE_DIR, "database", "pdf")


def _ensure_nltk_data():
    resources = (
        ("punkt", "tokenizers/punkt"),
        ("punkt_tab", "tokenizers/punkt_tab"),
        ("stopwords", "corpora/stopwords"),
    )
    for resource, path in resources:
        try:
            nltk.data.find(path)
        except LookupError:
            nltk.download(resource, quiet=True)


_ensure_nltk_data()


def list_pdf_files():
    files = os.listdir(PDF_DIRECTORY)
    return [{"id": i, "title": file, "file_path": os.path.join(PDF_DIRECTORY, file)} for i, file in enumerate(files, start=1) if file.endswith('.pdf')]


def extract_text_from_pdf(file_path):
    text = ""
    doc = fitz.open(file_path)
    for page in doc:
        text += page.get_text()
    doc.close()
    return text


def clean_text(text):
    text = text.lower()
    cleaned_text = ''.join(char for char in text if char.isalnum() or char.isspace())
    stop_words = set(stopwords.words('english'))
    words = word_tokenize(cleaned_text)
    return [word for word in words if word not in stop_words]


def summarize_text(text, sentence_count=5):
    sentence_scores = defaultdict(int)
    sentences = sent_tokenize(text)
    word_frequencies = nltk.FreqDist(clean_text(text))
    for sentence in sentences:
        for word in word_tokenize(sentence.lower()):
            if word in word_frequencies:
                sentence_scores[sentence] += word_frequencies[word]
    summary_sentences = heapq.nlargest(sentence_count, sentence_scores, key=sentence_scores.get)
    return ' '.join(summary_sentences)


_UNICODE_REPLACEMENTS = {
    "•": "-",   # •
    "‘": "'", "’": "'",  # ‘ ’
    "“": '"', "”": '"',  # “ ”
    "–": "-", "—": "-",  # – —
}


def create_summary_pdf(summary_text, output_path):
    # The built-in "Arial"/helvetica core font only supports Latin-1. PDFs
    # extracted from real documents often contain bullets, smart quotes, etc.
    # that fall outside that range and would otherwise crash fpdf2.
    for char, replacement in _UNICODE_REPLACEMENTS.items():
        summary_text = summary_text.replace(char, replacement)
    safe_text = summary_text.encode("latin-1", "replace").decode("latin-1")

    pdf = FPDF()
    pdf.add_page()
    pdf.set_font("helvetica", size=12)
    pdf.multi_cell(0, 10, safe_text)
    pdf.output(output_path)
