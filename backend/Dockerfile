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

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]