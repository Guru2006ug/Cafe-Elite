# Cafe-Elite

A modern, premium cafe website built with React and featuring an interactive user experience. Cafe-Elite showcases a sophisticated menu browsing interface, product shop, and engaging animations.

## Features

- **Home Page**: Hero section with animated coffee imagery and cafe story
- **Menu Page**: Browse coffee recipes and brewing methods with detailed information
- **Shop Page**: E-commerce interface for purchasing cafe products
- **Responsive Design**: Mobile-first approach with responsive UI components
- **Smooth Animations**: GSAP animations with scroll triggers for engaging interactions
- **Accessible Components**: Built with Radix UI primitives for accessibility
- **Toast Notifications**: User feedback with Sonner and Radix UI toast components

## Tech Stack

### Core
- **React** (^18.3.1) - UI library
- **Vite** (^5.4.19) - Build tool and dev server
- **React Router** (^6.30.1) - Client-side routing

### Styling & UI
- **Tailwind CSS** (^3.4.17) - Utility-first CSS framework
- **Tailwind Merge** - Utility merging for dynamic classes
- **Tailwind CSS Animate** - Animation utilities
- **Radix UI** - Unstyled, accessible UI components
- **shadcn/ui** - High-quality React components built on Radix UI
- **Lucide React** - Beautiful icon library

### Animations & Effects
- **GSAP** (^3.15.0) - Professional animation library
- **ScrollTrigger** - GSAP plugin for scroll-based animations

### Data & State Management
- **TanStack React Query** (^5.83.0) - Server state management
- **React Hook Form** (^7.61.1) - Performant form management
- **Zod** (^3.25.76) - TypeScript-first schema validation

### UI Utilities
- **Sonner** - Toast notifications
- **Embla Carousel** - Carousel component
- **Input OTP** - OTP input component
- **React Resizable Panels** - Resizable layout panels
- **Recharts** (^2.15.4) - React charts library
- **Class Variance Authority** - Type-safe CSS class management
- **clsx** - Conditional classname utility

### Development
- **Vitest** (^3.2.4) - Unit testing framework
- **ESLint** - Code linting
- **PostCSS** - CSS transformations
- **Autoprefixer** - CSS vendor prefixing

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm, yarn, pnpm, or bun

### Installation

```bash
# Install dependencies
npm install
```

### Development

```bash
# Start development server
npm run dev

# The app will be available at http://localhost:5173
```

### Building

```bash
# Build for production
npm run build

# Build for development
npm run build:dev

# Preview production build locally
npm preview
```

### Testing

```bash
# Run tests once
npm run test

# Run tests in watch mode
npm run test:watch
```

### Linting

```bash
# Lint code
npm run lint
```

## Project Structure

```
src/
├── components/          # React components
│   ├── NavLink.jsx     # Navigation link component
│   └── ui/             # shadcn/ui and Radix UI components
├── pages/              # Page components
│   ├── Index.jsx       # Home page with hero and story
│   ├── Menu.jsx        # Coffee menu page
│   ├── Shop.jsx        # Product shop page
│   └── NotFound.jsx    # 404 page
├── hooks/              # Custom React hooks
│   ├── use-mobile.jsx  # Mobile detection hook
│   └── use-toast.js    # Toast notification hook
├── lib/                # Utility functions
│   └── utils.js        # Common utilities
├── assets/             # Images and static assets
├── App.jsx             # Main app component with routing
├── main.jsx            # Application entry point
├── App.css             # App styles
└── index.css           # Global styles
```

## Available Routes

- `/` - Home page
- `/menu` - Menu page with coffee recipes and brewing methods
- `/shop` - Product shop page
- `/*` - 404 Not Found page

## Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run build:dev` | Build for development |
| `npm run preview` | Preview production build |
| `npm run test` | Run tests once |
| `npm run test:watch` | Run tests in watch mode |
| `npm run lint` | Lint code with ESLint |

## Contributing

Feel free to submit issues and enhancement requests!

## License

This project is private and proprietary.
