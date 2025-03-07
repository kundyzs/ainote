import pytesseract
from PIL import Image
import PyPDF2
import whisper
from transformers import pipeline

def extract_text_from_image(image_path):
    return pytesseract.image_to_string(Image.open(image_path))

def extract_text_from_pdf(pdf_path):
    with open(pdf_path, "rb") as file:
        reader = PyPDF2.PdfFileReader(file)
        text = ""
        for page_num in range(reader.numPages):
            text += reader.getPage(page_num).extract_text()
    return text

def transcribe_audio(audio_path):
    model = whisper.load_model("base")
    result = model.transcribe(audio_path)
    return result["text"]

summarizer = pipeline("summarization")

def summarize_text(text):
    return summarizer(text, max_length=130, min_length=30, do_sample=False)[0]["summary_text"]