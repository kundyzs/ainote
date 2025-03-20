import pytesseract
from PIL import Image
import PyPDF2
import whisper
import os
from transformers import pipeline


def process_file(file_path):
    _, file_extension = os.path.splitext(file_path)
    
    if file_extension.lower() in [".jpg", ".jpeg", ".png"]:
        return extract_text_from_image(file_path)
    elif file_extension.lower() == ".pdf":
        return extract_text_from_pdf(file_path)
    elif file_extension.lower() in [".txt"]:
        with open(file_path, "r") as file:
            text = file.read()
        return text
    else:
        raise ValueError("Unsupported file type")

def extract_text_from_image(image_path):
    return pytesseract.image_to_string(Image.open(image_path))

def extract_text_from_pdf(pdf_path):
    with open(pdf_path, "rb") as file:
        reader = PyPDF2.PdfFileReader(file)
        text = ""
        for page_num in range(reader.numPages):
            text += reader.getPage(page_num).extract_text()
    return text

#def transcribe_audio(audio_path):
 #   model = whisper.load_model("base")
  #  result = model.transcribe(audio_path)
   # return result["text"]

summarizer = pipeline("summarization")

def summarize_text(text):
    return summarizer(text, max_length=130, min_length=30, do_sample=False)[0]["summary_text"]