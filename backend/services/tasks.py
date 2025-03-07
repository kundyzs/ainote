from celery import Celery

app = Celery("tasks", broker="redis://localhost:6379/0")

@app.task
def process_file(file_path):
    # Perform AI processing here
    return "File processed"