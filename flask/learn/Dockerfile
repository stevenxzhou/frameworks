FROM python:3.9-alpine

WORKDIR /app

COPY main.py .
COPY requirements.txt .

RUN pip install flask
RUN pip install --no-cache-dir -r requirements.txt
ENV FLASK_APP=main.py
CMD ["flask", "run", "--host=0.0.0.0", "--port=3000"]
