FROM nvidia/cuda:12.3.2-cudnn9-runtime-ubuntu22.04

FROM python:3.9

ENV POETRY_VERSION=1.8.3 \
    POETRY_VIRTUALENVS_CREATE=false

# System dependencies
RUN pip install "poetry==$POETRY_VERSION"

WORKDIR /app/

COPY pyproject.toml /app/
COPY poetry.lock /app/

RUN poetry install --no-dev

COPY . /app/

EXPOSE 8000

ENV LD_LIBRARY_PATH=/usr/local/lib/python3.9/site-packages/nvidia/cublas/lib:/usr/local/lib/python3.9/site-packages/nvidia/cudnn/lib

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
