# AI Code Copilot

A modern, Frontend AI-powered code generation application built with Next.js 15, TypeScript. Generate clean, well-commented code snippets in multiple programming languages using AI.

![Next.js](https://img.shields.io/badge/Next.js-15-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-38B2AC)

## ✨ Features

### Core Functionality

- 🤖 **AI-Powered Code Generation** - Generate code using OpenRouter API (Google Gemini 2.5 Flash)
- 💾 **Persistent Storage** - All generations saved Localstorage
- 📋 **One-Click Copy** - Copy generated code to clipboard
- ⌨️ **Keyboard Shortcuts** - Press `Shift+Enter` to generate code
- 🎨 **Light/Dark Mode** - Toggle between themes with persistence
- 📱 **Responsive Design** - Works seamlessly on desktop and mobile

### Supported Languages

- Python
- JavaScript
- TypeScript
- Java
- C++
- Go
- C#

### Technical Features

- ✅ RESTful API endpoints
- ✅ Server-side rendering with Next.js 14 App Router
- ✅ React Query for optimized data fetching
- ✅ Zod schema validation
- ✅ Optimistic UI updates
- ✅ Error handling and user feedback
- ✅ Accessibility-first design

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ installed
- An [OpenRouter](https://openrouter.ai) API key

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/Rishivenkatakousik/copilot-frontend.git
cd copilot-frontend
```

2. **Install dependencies**

```bash
npm install
```

3. **Set up environment variables**

Create a `.env.local` file in the root directory:

```env
# OpenRouter API - Get from OpenRouter Dashboard
OPENROUTER_API_KEY=sk-or-v1-xxxxx
OPENROUTER_MODEL=google/gemini-2.5-flash

# Application
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

5. **Run the development server**

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🏗️ Architecture & Design Decisions

### Frontend Architecture

**Framework Choice: Next.js 15 App Router**

- Server-side rendering for improved SEO and performance
- App Router for modern file-based routing
- Server Components for reduced client-side JavaScript

**State Management**

- **React Query** - Server state management with automatic caching, refetching, and optimistic updates
- **React Context** - Theme state (light/dark mode)
- **Component State** - UI-specific state (modals, dropdowns)
- **prompt history** - stores prompts in the localstorage.

**Styling Approach**

- **Tailwind CSS** - Utility-first CSS for rapid development
- **Shadcn/ui** - Accessible, customizable component library
- **CSS Variables** - Theme-aware color system

### Backend Architecture

**API Design**

RESTful endpoints following best practices:

- `POST /api/generate` - Idempotent code generation

**Technology Stack**

- **Zod** - Runtime type validation
- **OpenRouter** - Multi-model AI gateway

## 📡 API Documentation

### POST `/api/generate`

Generate code using AI.

**Request Body:**

```json
{
  "prompt": "Write a function to reverse a string",
  "language": "python"
}
```

**Response (Success):**

```json
{
  "code": "def reverse_string(s):\n    return s[::-1]\n\n# Example usage\ntext = \"Hello, World!\"\nreversed_text = reverse_string(text)\nprint(reversed_text)  # !dlroW ,olleH"
}
```

**Response (Error):**

```json
{
  "error": "Failed to generate code",
  "details": "API key is invalid"
}
```

**Supported Languages:**

- `python`
- `javascript`
- `typescript`
- `java`
- `cpp`
- `go`
- `csharp`

---

## 🎯 Future Improvements

If I had more time, I would implement:

1. **Real-time Code Streaming** - Stream AI responses word-by-word instead of waiting for complete generation, improving perceived performance and user engagement

2. **Advanced Code Editor** - Replace textarea with Monaco Editor (VS Code's editor) featuring autocomplete, and multi-cursor support

3. **Snippet Management System** - Add favorites, tags, folders, and search functionality to organize and quickly retrieve saved code snippets

4. **Collaboration Features** - Enable snippet sharing via links, export collections as JSON/Markdown, and optional public gallery for community sharing

5. **Progressive Web App** - Add offline support, installability, and mobile-optimized gestures (swipe-to-delete, pull-to-refresh) for a native-like experience

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org) - React framework
- [OpenRouter](https://openrouter.ai) - AI model gateway
- [Shadcn/ui](https://ui.shadcn.com) - Component library
- [Tailwind CSS](https://tailwindcss.com) - Utility CSS framework

## 📧 Contact

For questions or feedback, please open an issue on GitHub.

---

**Built with ❤️ using Next.js 15 and TypeScript**
