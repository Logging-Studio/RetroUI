import React from 'react';
import { TableOfContents as TOCType } from '@/lib/toc';

interface TableOfContentsProps {
  toc: TOCType;
}

function renderTOCItems(items: any[], level = 0) {
  if (!items || items.length === 0) return null;

  return (
    <ul className={`space-y-1 ${level > 0 ? 'ml-4 mt-1' : ''}`}>
      {items.map((item, index) => (
        <li key={index}>
          <a
            href={item.url}
            className="text-sm hover:text-foreground transition-colors block py-1 border-l-2 border-transparent hover:border-accent pl-2"
          >
            {item.title}
          </a>
          {item.items && renderTOCItems(item.items, level + 1)}
        </li>
      ))}
    </ul>
  );
}

export default function TableOfContents({ toc }: TableOfContentsProps) {
  if (!toc.items || toc.items.length === 0) {
    return null;
  }

  return (
    <div className="border p-4 rounded-sm max-h-60 overflow-y-scroll overscroll-y-contain sidebar-scroll">
      <h3 className="mb-3 border-b border-black pb-2">
        On this Page
      </h3>
      {renderTOCItems(toc.items)}
    </div>
  );
}