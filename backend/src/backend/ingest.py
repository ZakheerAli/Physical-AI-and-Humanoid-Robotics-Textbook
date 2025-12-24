# ingest.py
import argparse
import os
import re
import uuid
from qdrant_client import QdrantClient
from qdrant_client.http import models
from backend.config import settings

def parse_mdx_frontmatter(content):
    """
    Parses and removes the YAML frontmatter from an MDX file.
    """
    frontmatter_pattern = re.compile(r'^---\s*\n(.*?)\n---\s*\n', re.DOTALL)
    match = frontmatter_pattern.match(content)
    if match:
        return content[match.end():]
    return content

def find_and_parse_mdx_files(source_dir):
    """
    Finds all MDX files in the source directory, parses them, and returns a list of documents.
    """
    documents = []
    for root, _, files in os.walk(source_dir):
        for file in files:
            if file.endswith(".mdx"):
                path = os.path.join(root, file)
                with open(path, "r", encoding="utf-8") as f:
                    content = f.read()
                
                # Remove frontmatter
                content = parse_mdx_frontmatter(content)
                
                documents.append({"text": content, "source": path})
    return documents

def chunk_documents(documents, chunk_size=1000, chunk_overlap=200):
    """
    Splits a list of documents into smaller chunks.
    """
    from langchain_text_splitters import RecursiveCharacterTextSplitter

    text_splitter = RecursiveCharacterTextSplitter(
        chunk_size=chunk_size,
        chunk_overlap=chunk_overlap,
        length_function=len,
    )
    
    chunks = []
    for doc in documents:
        texts = text_splitter.split_text(doc["text"])
        chunks.extend([{"text": text, "source": doc["source"]} for text in texts])
    
    return chunks

def generate_embeddings(chunks, model_name="all-MiniLM-L6-v2"):
    """
    Generates embeddings for a list of text chunks using sentence-transformers.
    """
    from sentence_transformers import SentenceTransformer
    
    print(f"Loading embedding model: {model_name}...")
    model = SentenceTransformer(model_name)
    
    texts = [chunk["text"] for chunk in chunks]
    print(f"Generating embeddings for {len(texts)} chunks...")
    embeddings = model.encode(texts)
    
    for i, chunk in enumerate(chunks):
        chunk["embedding"] = embeddings[i].tolist()
    
    return chunks

def upload_to_qdrant(chunks, collection_name="textbook"):
    """
    Uploads chunks and their embeddings to Qdrant.
    """
    print(f"Connecting to Qdrant at {settings.QDRANT_URL}...")
    client = QdrantClient(
        url=settings.QDRANT_URL,
        api_key=settings.QDRANT_API_KEY,
    )
    
    # Recreate collection
    print(f"Recreating collection '{collection_name}'...")
    client.recreate_collection(
        collection_name=collection_name,
        vectors_config=models.VectorParams(
            size=384,  # Dimension for all-MiniLM-L6-v2
            distance=models.Distance.COSINE,
        ),
    )
    
    points = []
    for chunk in chunks:
        points.append(
            models.PointStruct(
                id=str(uuid.uuid4()),
                vector=chunk["embedding"],
                payload={
                    "text": chunk["text"],
                    "source": chunk["source"],
                },
            )
        )
    
    # Upload in batches
    batch_size = 100
    print(f"Uploading {len(points)} points in batches of {batch_size}...")
    for i in range(0, len(points), batch_size):
        batch = points[i : i + batch_size]
        client.upsert(
            collection_name=collection_name,
            points=batch,
        )
        print(f"Uploaded batch {i // batch_size + 1}")
    
    print("Upload complete.")

def main():
    parser = argparse.ArgumentParser(description="Ingest documents into the vector store.")
    parser.add_argument("--source", type=str, default=None, help="The source directory of the documents.")
    args = parser.parse_args()

    # Calculate default source path relative to this script
    if args.source is None:
        # Script is at backend/src/backend/ingest.py
        # root is 3 levels up from ingest.py (backend, src, backend)
        # No, script is in src/backend, so 3 levels up from src/backend is root
        script_dir = os.path.dirname(os.path.abspath(__file__)) # backend/src/backend
        base_dir = os.path.dirname(os.path.dirname(os.path.dirname(script_dir))) # root
        source_dir = os.path.join(base_dir, "frontend", "docs")
    else:
        source_dir = args.source

    print(f"Starting ingestion from source: {source_dir}")
    documents = find_and_parse_mdx_files(source_dir)
    print(f"Found {len(documents)} documents.")
    
    if not documents:
        print("No documents found. Exiting.")
        return
    
    chunks = chunk_documents(documents)
    print(f"Split documents into {len(chunks)} chunks.")
    
    chunks_with_embeddings = generate_embeddings(chunks)
    print("Embeddings generated successfully.")
    
    upload_to_qdrant(chunks_with_embeddings)
    
    print("Ingestion complete.")

if __name__ == "__main__":
    main()
