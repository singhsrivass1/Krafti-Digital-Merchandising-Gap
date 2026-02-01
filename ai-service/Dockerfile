# -------------------------------
# Base image (HF-compatible)
# -------------------------------
FROM python:3.10-slim

# -------------------------------
# System dependencies
# -------------------------------
RUN apt-get update && apt-get install -y \
    git \
    curl \
    libgl1 \
    libglib2.0-0 \
    && rm -rf /var/lib/apt/lists/*

# -------------------------------
# Environment settings
# -------------------------------
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1
ENV PORT=7860

# -------------------------------
# Working directory
# -------------------------------
WORKDIR /app

# -------------------------------
# Install Python dependencies
# -------------------------------
COPY requirements.txt .

RUN pip install --upgrade pip && \
    pip install --no-cache-dir -r requirements.txt

# -------------------------------
# Copy application code
# -------------------------------
COPY app ./app

# -------------------------------
# Expose HF-required port
# -------------------------------
EXPOSE 7860

# -------------------------------
# Run FastAPI (HF expects 7860)
# -------------------------------
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "7860"]
