# Use the official Python image as a base image
FROM python:3.13-slim-bookworm

# Set the working directory in the container
WORKDIR /app

# Install system dependencies (if any required for psycopg or others)
# RUN apt-get update && apt-get install -y --no-install-recommends gcc libpq-dev && rm -rf /var/lib/apt/lists/*

# Copy pyproject.toml and poetry.lock to the working directory
COPY pyproject.toml poetry.lock ./

# Install Poetry
RUN pip install poetry

# Configure poetry to not create a virtual environment (easier for Docker)
RUN poetry config virtualenvs.create false

# Install project dependencies
RUN poetry install --no-root --no-dev

# Copy the source code
COPY src ./src

# Expose the port the app runs on (Hugging Face Spaces default is 7860)
EXPOSE 7860

# Command to run the application
# Note: 'backend' package is in 'src', so we point uvicorn to it.
# PYTHONPATH is implicitly handled if we install the package, but for dev changes:
ENV PYTHONPATH=/app/src

CMD ["uvicorn", "backend.main:app", "--host", "0.0.0.0", "--port", "7860"]