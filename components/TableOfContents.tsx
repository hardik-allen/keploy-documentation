'use client';

import { useEffect, useState } from 'react';
import { useTheme } from './ThemeProvider';

interface Heading {
  id: string;
  text: string;
  level: number;
}

export default function TableOfContents() {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState<string>('');
  const { theme } = useTheme();

  useEffect(() => {
    // Extract headings from the page
    const headingElements = document.querySelectorAll('.prose h2[id], .prose h3[id]');
    const headingList: Heading[] = Array.from(headingElements).map((element) => ({
      id: element.id,
      text: element.textContent || '',
      level: parseInt(element.tagName.charAt(1)),
    }));

    setHeadings(headingList);

    // Set up intersection observer for active heading
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-20% 0% -35% 0%',
        threshold: 0,
      }
    );

    headingElements.forEach((element) => observer.observe(element));

    return () => {
      headingElements.forEach((element) => observer.unobserve(element));
    };
  }, []);

  if (headings.length === 0) {
    return null;
  }

  return (
    <aside
      key={theme}
      className="hidden lg:block lg:relative lg:w-48 lg:flex-shrink-0 lg:border-l lg:border-zinc-200 lg:bg-white lg:dark:border-zinc-800 lg:dark:bg-black lg:px-3 xl:px-4 lg:py-6 xl:py-8"
    >
      <nav className="sticky top-16 lg:top-20 space-y-2">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-3">
          On this page
        </h3>
        <ul className="space-y-0.5">
          {headings.map((heading) => (
            <li key={heading.id}>
              <a
                href={`#${heading.id}`}
                className={`block text-xs transition-colors duration-200 leading-relaxed ${
                  heading.level === 3 ? 'pl-3' : ''
                } ${
                  activeId === heading.id
                    ? 'text-zinc-900 font-medium dark:text-zinc-100'
                    : 'text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200'
                }`}
                onClick={(e) => {
                  e.preventDefault();
                  const element = document.getElementById(heading.id);
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                }}
              >
                {heading.text}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}

