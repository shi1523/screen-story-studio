# Clueso.io Clone

A fully functional clone of [Clueso.io](https://clueso.io) - an AI-powered platform that transforms raw screen recordings into stunning product videos and documentation.

## 🚀 Live Demo

Built with React, TypeScript, and Tailwind CSS.

## 📋 Project Overview

This project replicates the core functionality and user experience of Clueso.io, demonstrating:
- Product understanding and reverse engineering
- Clean code practices and modern frontend development
- Professional UI/UX design implementation

## ✨ Features

### Core Functionality
- **Video Upload**: Drag & drop interface for uploading screen recordings
- **AI Processing**: Simulated AI-powered transcription and script generation
- **Script Editor**: Edit and regenerate AI-generated video scripts
- **Documentation Generator**: Auto-generated step-by-step guides with screenshots
- **Export Options**: Multiple format exports (HD/SD video, PDF/Markdown docs)

### User Interface
- **Landing Page**: Hero section, features showcase, testimonials, CTA
- **Dashboard**: Project management with search, filters, and status badges
- **Upload Page**: Intuitive file upload with progress tracking
- **Processing View**: Real-time AI processing status with step indicators
- **Preview Page**: Video player with editable script and documentation tabs
- **Export Page**: Format selection and download management

## 🛠️ Tech Stack

- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui (Radix UI primitives)
- **Routing**: React Router DOM
- **State Management**: TanStack Query
- **Icons**: Lucide React
- **Animations**: CSS animations + Tailwind utilities

## 📁 Project Structure

```
src/
├── components/
│   ├── landing/
│   │   └── LandingSections.tsx    # Hero, Features, Testimonials, CTA
│   ├── layout/
│   │   ├── Navbar.tsx             # Navigation with mega menus
│   │   └── Footer.tsx             # Site footer
│   └── ui/                        # shadcn/ui components
├── pages/
│   ├── Index.tsx                  # Landing page
│   ├── Dashboard.tsx              # Project management
│   ├── Upload.tsx                 # Video upload
│   ├── Processing.tsx             # AI processing view
│   ├── Preview.tsx                # Video + docs preview
│   └── Export.tsx                 # Export options
├── hooks/                         # Custom React hooks
├── lib/                           # Utility functions
├── index.css                      # Global styles & design tokens
└── App.tsx                        # Root component with routing
```

## 🎨 Design System

The project uses a custom design system matching Clueso's brand:

### Colors
- **Primary**: `#E91E8C` (Clueso Pink/Magenta)
- **Background**: Pure white
- **Foreground**: Near black for text
- **Accent**: Soft pink for highlights

### Typography
- **Display Font**: Plus Jakarta Sans
- **Body Font**: Inter

### Components
- Custom button variants (hero, glass, outline)
- Gradient backgrounds and shadows
- Smooth animations and transitions

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <YOUR_GIT_URL>
cd <YOUR_PROJECT_NAME>
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
```

## 📱 Pages & Routes

| Route | Description |
|-------|-------------|
| `/` | Landing page |
| `/dashboard` | Project management dashboard |
| `/upload` | Video upload interface |
| `/processing/:id` | AI processing status |
| `/preview/:id` | Video & documentation preview |
| `/export/:id` | Export format selection |

## 🔮 Future Enhancements

- [ ] User authentication (sign up/login)
- [ ] Real AI-powered video transcription
- [ ] Actual video processing and editing
- [ ] Team collaboration features
- [ ] Cloud storage integration
- [ ] Multi-language support

## 📝 Assignment Notes

This project was built as a technical assignment to demonstrate:

1. **Product Understanding**: Analyzed Clueso.io's features, workflows, and UX patterns
2. **Technical Execution**: Clean, maintainable code with proper TypeScript usage
3. **UI/UX Design**: Pixel-perfect recreation of the Clueso design system
4. **Documentation**: Comprehensive README and code comments

### Design Decisions
- Used shadcn/ui for accessible, customizable components
- Implemented responsive design for all screen sizes
- Added smooth animations for better user experience
- Created reusable design tokens for consistent styling

## 🎥 Video Demo

[Link to video demo will be added here]

## 📄 License

This project is for demonstration purposes only. Clueso is a trademark of its respective owners.

## 👤 Author

Built as a technical assessment project.

---

**Note**: This is a frontend prototype. Backend functionality (AI processing, video editing, storage) would require additional implementation with appropriate APIs and services.
