#BruteForce

# Krafti — AI-Powered Craft Listing Generator (MVP)

## Overview

Krafti is a web application that converts a single product photo uploaded by an artisan into a ready-to-use product listing.

The system is designed specifically for handcrafted goods and emphasizes:
- visual clarity
- material awareness
- honest, descriptive language

From a single image, Krafti:
- removes the background
- enhances the product image
- generates a product title and description using vision and language models
- prepares the pipeline for an independent pricing intelligence layer

This MVP demonstrates a complete **image → intelligence → listing** workflow.

---

## High-Level Architecture

- **Frontend (React + TypeScript)**
  - Sends multipart image upload
- **AI Service (FastAPI, Python)**
  - Processes image and generates intelligence
- **Response**
  - JSON containing image, title, description, and price placeholder

  
---

## Tech Stack

### Frontend
- React
- TypeScript
- Vite
- TailwindCSS
- Fetch API

### Backend (AI Service)
- FastAPI
- Uvicorn
- Python 3.x

### AI / ML
- Background removal: rembg (U²-Net)
- Image enhancement: Pillow
- Vision → text: BLIP (Salesforce/blip-image-captioning-base)
- Text refinement: Groq LLM (polishing only)

### Supporting Libraries
- transformers
- torch
- huggingface-hub
- python-multipart
- numpy
- onnxruntime
- python-dotenv

---

## AI Pipeline

### 1. Image Upload
- User uploads a single product image.

### 2. Background Removal
- Powered by rembg (U²-Net).
- Produces an RGBA image with transparency.
- Fail-safe: original image is returned if removal fails.

### 3. Image Enhancement
- Deterministic and non-destructive.
- Slight brightness increase.
- Contrast boost.
- Mild sharpening.
- No artistic filters to preserve craft authenticity.

### 4. Vision → Text
- BLIP generates a raw, factual caption.
- Example:



### 5. Language Polishing
- Raw caption is passed to a Groq-hosted LLM.
- The LLM:
- avoids marketing language
- conservatively infers material, form, and texture
- Generates:
- a short product title
- two descriptive sentences
- Fail-safe: falls back to the raw caption if the LLM fails.

### 6. Response to Frontend

```json
{
"image": "<base64>",
"title": "Earthen Terra Vessel",
"description": [
  "A sturdy clay vessel with organic curves and subtle surface texture.",
  "Natural tones evoke a grounded, rustic character."
],
"price": null
}


ai-service/
│
├── app/
│   ├── main.py
│   ├── api/
│   │   └── enhance.py
│   ├── services/
│   │   ├── background.py
│   │   ├── enhancement.py
│   │   ├── description.py
│   │   ├── groq_llm.py
│   │   └── vision_stub.py
│   ├── utils/
│   │   ├── image.py
│   │   └── validators.py
│   └── test_pipeline.py
│
├── venv/
└── requirements.txt


# Activate virtual environment
venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Run server
python -m uvicorn app.main:app --host 127.0.0.1 --port 8000


