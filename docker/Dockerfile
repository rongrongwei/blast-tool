FROM python:3.9.5
WORKDIR /app
COPY requirements.txt ./
COPY app.py ./
COPY util.py ./
ADD static static

RUN pip install --no-cache-dir -r requirements.txt

CMD [ "python", "./app.py" ]