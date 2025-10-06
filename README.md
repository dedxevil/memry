# MEMRY Clinical Chat

**MEMRY** (Medical Electronic Management & Response sYstem) is a modern, responsive clinical chat application UI designed to serve as a frontend for a multi-agent framework, such as one built with Microsoft Azure AI. It features a sleek, intuitive interface inspired by leading AI chat platforms, providing a professional and user-friendly experience for clinical professionals.

## Key Features

- **Modern & Responsive UI**: A clean, ChatGPT-like interface that works seamlessly on both desktop and mobile devices.
- **Thread Management**: Create, select, and delete chat threads. Conversations are automatically named by date for easy organization.
- **Collapsible Sidebar**: Maximize your workspace by collapsing the sidebar to an icon-only view. The state is saved locally.
- **Dark/Light Theme**: Switch between dark and light modes to suit your preference. The choice is persisted across sessions.
- **Human-Readable JSON**: Intelligently detects and formats JSON responses from the assistant into a doctor-friendly, titled format instead of raw code.
- **Dynamic UI Feedback**: Subtle loading indicators, message appearance animations, and disabled states provide a responsive and intuitive user experience.
- **Configurable Backend**: Easily connect the UI to your backend service by setting the API Base URL in the settings modal.

## Tech Stack

- **Framework**: React
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **API Communication**: `fetch` API

## Getting Started

This project is a frontend-only application. It is designed to be a "headless" UI that communicates with a separate backend service you provide.

### Prerequisites

You need a running backend service that exposes a specific set of REST API endpoints for managing chat threads and messages.

### Backend API Contract

The MEMRY frontend expects your backend to expose the following endpoints:

- `GET /threads`: List all existing chat threads.
- `POST /threads`: Create a new, empty chat thread.
- `DELETE /threads/{thread_id}`: Delete a specific chat thread.
- `GET /threads/{thread_id}/messages`: Get all messages for a specific thread.
- `POST /threads/{thread_id}/messages`: Send a new message to a thread.
- `POST /threads/{thread_id}/run`: Instruct the agent to process the latest messages in the thread.
- `GET /threads/{thread_id}/run/{run_id}`: Check the status of an agent run.

*For detailed data structures, please refer to the interactions in `services/azureAgentService.ts`.*

### Configuration

1.  **Run the application.**
2.  Click the **Settings** icon (cog wheel) in the sidebar.
3.  In the **API Base URL** field, enter the full base URL of your running backend service (e.g., `https://your-backend-service.com` or `https://your-ngrok-tunnel.io`).
4.  Click **Save**.

The application will now use this URL to make all API calls. Once configured, you can start chatting.
