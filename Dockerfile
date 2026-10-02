# Multi-stage Dockerfile for AI Resume Matcher

# --- Stage 1: Build Frontend ---
FROM node:18-alpine AS frontend-builder
WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm ci --silent
COPY frontend/ ./
RUN npm run build

# --- Stage 2: Python Backend & Production Runtime ---
FROM python:3.11-slim
WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Copy backend requirements & install
COPY backend/requirements.txt ./backend/
RUN pip install --no-cache-dir -r backend/requirements.txt

# Copy backend code
COPY backend/ ./backend/

# Copy built frontend static assets into backend static mount or build output
COPY --from=frontend-builder /app/frontend/dist /app/frontend/dist

EXPOSE 8000

ENV PORT=8000
ENV HOST=0.0.0.0

CMD ["python", "backend/start.py"]
