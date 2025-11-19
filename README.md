# Keploy Echo + SQL Documentation

A comprehensive tutorial documentation site built with Next.js and MDX, showcasing how to integrate Keploy with Echo framework and SQL databases.

🌐 **Live Demo**: [https://keploy-documentation.vercel.app/](https://keploy-documentation.vercel.app/)

## Features

- 📚 **Comprehensive Tutorial**: Step-by-step guide for integrating Keploy with Echo + SQL applications
- 🎨 **Modern UI**: Clean, professional design with responsive layout
- 🌓 **Dark/Light Mode**: Theme toggle for better reading experience (desktop/tablet)
- 📱 **Mobile Responsive**: Fully optimized for all screen sizes
- 🧭 **Navigation**: Sidebar navigation with collapsible sections and table of contents
- 💡 **Interactive Components**: Custom Callout and WhyBox components for enhanced readability
- 🖼️ **Visual Guides**: Screenshots and images integrated throughout the tutorial

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Content**: MDX for markdown with React components
- **Styling**: Tailwind CSS
- **TypeScript**: Full type safety

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm, yarn, pnpm, or bun

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the documentation.

### Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
keploy-documentation/
├── app/
│   ├── page.mdx          # Main tutorial content
│   ├── layout.tsx        # Root layout with header, sidebar, footer
│   └── globals.css       # Global styles and theme
├── components/
│   ├── Header.tsx        # Navigation header
│   ├── Sidebar.tsx       # Collapsible sidebar navigation
│   ├── Footer.tsx        # Footer with links
│   ├── TableOfContents.tsx  # Right-side TOC
│   ├── Callout.tsx       # Info/warning/success callout component
│   ├── WhyBox.tsx        # "Why" explanation component
│   ├── ThemeProvider.tsx # Theme context provider
│   └── SidebarContext.tsx # Sidebar state management
├── public/
│   └── tutorial-images/  # Tutorial screenshots
└── mdx-components.tsx    # MDX component mappings
```

## Custom Components

### Callout
```mdx
<Callout type="info">
  This is an informational callout.
</Callout>
```

Types: `info`, `warning`, `success`, `error`

### WhyBox
```mdx
<WhyBox title="Why this matters">
  Explanation of why this step is important.
</WhyBox>
```

## Deployment

🌐 **Live Site**: [https://keploy-documentation.vercel.app/](https://keploy-documentation.vercel.app/)

## License

This project is part of the Keploy documentation.
