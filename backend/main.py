from faster_whisper import WhisperModel
from fastapi import FastAPI, UploadFile
from fastapi.middleware.cors import CORSMiddleware
import os
import logging

logger = logging.getLogger('uvicorn.error')

app = FastAPI()

origins = [
    "http://localhost", "https://voxtera.cameronshaw.me", "https://localhost:3000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

if os.getenv('USE_CUDA', 'false') == 'true':
    logger.info("Using CUDA")
    model = WhisperModel("small.en", device="cuda", compute_type="float16")
else:
    logger.info("Using CPU")
    model = WhisperModel("small.en", device="cpu", compute_type="int8")


@app.post("/transcribe")
def transcribe(file: UploadFile):
    segments, info = model.transcribe(file.file, beam_size=5)

    logger.debug("Detected language '%s' with probability %f" % (info.language, info.language_probability))

    text = []
    for segment in segments:
        logger.debug("[%.2fs -> %.2fs] %s" % (segment.start, segment.end, segment.text))
        text.append(segment.text)
    response = {"text": "\n".join(text)}
    return response
