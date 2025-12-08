# Auth API Contract

This document outlines the API contract for user authentication.

## Endpoints

### `POST /auth/register`

Registers a new user.

*   **Request Body:**
    *   `username` (string, required)
    *   `email` (string, required)
    *   `password` (string, required)
    *   `role` (string, optional, default: "student")
*   **Responses:**
    *   `201 Created`: User successfully registered. Returns a JWT token.
    *   `400 Bad Request`: Invalid input (e.g., missing fields, invalid email).
    *   `409 Conflict`: Username or email already exists.

### `POST /auth/login`

Logs in an existing user.

*   **Request Body:**
    *   `email` (string, required)
    *   `password` (string, required)
*   **Responses:**
    *   `200 OK`: User successfully logged in. Returns a JWT token.
    *   `401 Unauthorized`: Invalid credentials.
