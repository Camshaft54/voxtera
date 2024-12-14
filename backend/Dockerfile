FROM nvidia/cuda:12.3.2-cudnn9-runtime-ubuntu22.04

FROM python:3.9

ENV DEBIAN_FRONTEND=noninteractive \
    POETRY_VERSION=1.8.3 \
    POETRY_VIRTUALENVS_CREATE=false \
    LD_LIBRARY_PATH=/usr/local/lib/python3.9/site-packages/nvidia/cublas/lib:/usr/local/lib/python3.9/site-packages/nvidia/cudnn/lib

# System dependencies
# RUN apt update && apt install software-properties-common -y && add-apt-repository ppa:deadsnakes/ppa 
# RUN apt update && apt install python3.9 python3.9-dev python3.9-venv python3.9-distutils python3-pip -y
RUN pip install --no-cache-dir "poetry==$POETRY_VERSION"
# RUN apt-get clean \
#     && rm -rf /var/lib/apt/lists/*

WORKDIR /app/

COPY pyproject.toml /app/
COPY poetry.lock /app/

RUN poetry install --no-dev

COPY . /app/

EXPOSE 8000

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
