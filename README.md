# Clueso.io Clone

A functional clone of [Clueso.io](https://clueso.io) — an AI-powered platform that transforms raw screen recordings into polished product videos and step-by-step documentation.

## Overview

This project recreates the core features and user experience of Clueso.io as a technical demonstration. It showcases modern frontend development practices, clean architecture, and professional UI/UX design.

## Features

### Core Functionality
- **Video Upload** — Drag-and-drop interface for screen recordings
- **AI Processing** — Simulated transcription and script generation workflow
- **Script Editor** — Edit, refine, and regenerate video scripts
- **Documentation Generator** — Auto-generated step-by-step guides with screenshots
- **Export Options** — Multiple formats including HD/SD video and PDF/Markdown docs

### Pages
- Landing page with hero, features, testimonials, and CTA sections
- Dashboard for project management with search and filtering
- Upload interface with progress tracking
- Processing view showing AI status indicators
- Preview page with video player, script editor, and documentation tabs
- Export page with format selection

## Tech Stack

| Category | Technology |
|----------|------------|
| Framework | React 18 + TypeScript |
| Build Tool | Vite |
| Styling | Tailwind CSS |
| Components | shadcn/ui (Radix UI) |
| Routing | React Router DOM |
| Data Fetching | TanStack Query |
| Icons | Lucide React |

## Project Structure

```
src/
├── components/
│   ├── landing/          # Landing page sections
│   ├── layout/           # Navbar, Footer
│   └── ui/               # Reusable UI components
├── pages/
│   ├── Index.tsx         # Landing page
│   ├── Dashboard.tsx     # Project management
│   ├── Upload.tsx        # Video upload
│   ├── Processing.tsx    # AI processing status
│   ├── Preview.tsx       # Video & docs preview
│   └── Export.tsx        # Export options
├── hooks/                # Custom React hooks
├── lib/                  # Utility functions
└── index.css             # Design tokens & global styles
```

## Design System

### Colors
- **Primary**: #E91E8C (Magenta)
- **Background**: #FFFFFF
- **Foreground**: #171717
- **Accent**: Soft pink highlights

### Typography
- Display: Plus Jakarta Sans
- Body: Inter

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/clueso-clone.git
cd clueso-clone

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) to view the app.

### Production Build

```bash
npm run build
npm run preview
```

## Routes

| Path | Description |
|------|-------------|
| `/` | Landing page |
| `/dashboard` | Project dashboard |
| `/upload` | Upload video |
| `/processing/:id` | Processing status |
| `/preview/:id` | Preview & edit |
| `/export/:id` | Export options |

## Roadmap

- [ ] User authentication
- [ ] Real video transcription API
- [ ] Actual video processing pipeline
- [ ] Team collaboration
- [ ] Cloud storage integration
- [ ] Multi-language support

## Development Notes

This project was developed with the following considerations:

1. **Architecture** — Component-based structure with clear separation of concerns
2. **Type Safety** — Full TypeScript implementation
3. **Accessibility** — Built on Radix UI primitives for a11y compliance
4. **Performance** — Optimized bundle with code splitting
5. **Responsive Design** — Mobile-first approach with Tailwind breakpoints

## License

This project is for demonstration and educational purposes only. Clueso is a trademark of its respective owners.

---

*Built as a technical assessment project demonstrating frontend development skills.*
