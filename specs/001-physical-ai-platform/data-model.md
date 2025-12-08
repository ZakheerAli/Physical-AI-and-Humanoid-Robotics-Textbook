# Data Model

This document outlines the data model for the Physical AI & Humanoid Robotics platform.

## 1. CurriculumModule

Represents a chapter in the book/platform.

| Field | Type | Description |
| :--- | :--- | :--- |
| `id` | `string` | Unique identifier for the module (e.g., "01-ros-nervous-system"). |
| `title` | `string` | The title of the module. |
| `description` | `string` | A brief summary of the module's content. |
| `learning_objectives` | `list[string]` | A list of learning objectives for the module. |
| `content` | `string` (MDX) | The main content of the module in MDX format. |
| `interactive_element_id` | `string` | Foreign key to the InteractiveElement associated with this module. |

## 2. CodeAsset

Represents a piece of code associated with a curriculum module.

| Field | Type | Description |
| :--- | :--- | :--- |
| `id` | `string` | Unique identifier for the code asset. |
| `name` | `string` | The name of the code asset (e.g., "hello_world.py"). |
| `language` | `string` | The programming language of the code asset (e.g., "python", "cpp"). |
| `content` | `string` | The actual code content. |
| `module_id` | `string` | Foreign key to the CurriculumModule this asset belongs to. |

## 3. HardwareGuide

Represents a guide for setting up hardware.

| Field | Type | Description |
| :--- | :--- | :--- |
| `id` | `string` | Unique identifier for the hardware guide. |
| `title` | `string` | The title of the guide. |
| `content` | `string` (MDX) | The content of the guide in MDX format. |
| `lab_type` | `enum` | The type of lab setup ("On-Premise" or "Cloud-Native"). |

## 4. User

Represents a user of the platform.

| Field | Type | Description |
| :--- | :--- | :--- |
| `id` | `string` | Unique identifier for the user. |
| `username` | `string` | The user's chosen username. |
| `email` | `string` | The user's email address. |
| `password_hash` | `string` | The hashed password for the user. |
| `role` | `enum` | The user's role ("student", "educator", "researcher"). |

## 5. InteractiveElement

Represents an interactive component embedded in a module.

| Field | Type | Description |
| :--- | :--- | :--- |
| `id` | `string` | Unique identifier for the interactive element. |
| `type` | `enum` | The type of interactive element (e.g., "slider", "diagram", "quiz"). |
| `configuration` | `json` | The configuration for the interactive element. |
| `module_id` | `string` | Foreign key to the CurriculumModule this element belongs to. |
