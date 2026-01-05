
"use client";

import { cn } from '@/lib/utils';
import React, { useEffect, useState } from 'react';

interface TOCItem {
    title: string;
    url: string;
    level: number;
    items?: TOCItem[];
}

interface ManualTOCItem {
    id: string;
    title: string;
    depth: number;
}

interface TableOfContentsProps {
    depth?: number;
    className?: string;
    children?: React.ReactNode;
    data?: ManualTOCItem[];
}

function generateTOCFromDOM(depth: number = 6): TOCItem[] {
    const headings: NodeListOf<HTMLHeadingElement> = document.querySelectorAll(
        Array.from({ length: depth }, (_, i) => `h${i + 1}`).join(', ')
    );

    const items: TOCItem[] = [];
    const stack: TOCItem[] = [];

    headings.forEach((heading) => {
        const level = parseInt(heading.tagName.charAt(1));
        const id = heading.id || heading.textContent?.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '') || '';

        if (!heading.id && id) {
            heading.id = id;
        }

        const item: TOCItem = {
            title: heading.textContent || '',
            url: `#${id}`,
            level,
        };

        while (stack.length > 0 && stack[stack.length - 1].level >= level) {
            stack.pop();
        }

        if (stack.length === 0) {
            items.push(item);
        } else {
            const parent = stack[stack.length - 1];
            if (!parent.items) parent.items = [];
            parent.items.push(item);
        }

        stack.push(item);
    });

    return items;
}

function convertManualDataToTOC(data: ManualTOCItem[]): TOCItem[] {
    const items: TOCItem[] = [];
    const stack: TOCItem[] = [];

    data.forEach((item) => {
        const tocItem: TOCItem = {
            title: item.title,
            url: `#${item.id}`,
            level: item.depth,
        };

        while (stack.length > 0 && stack[stack.length - 1].level >= item.depth) {
            stack.pop();
        }

        if (stack.length === 0) {
            items.push(tocItem);
        } else {
            const parent = stack[stack.length - 1];
            if (!parent.items) parent.items = [];
            parent.items.push(tocItem);
        }

        stack.push(tocItem);
    });

    return items;
}

function renderTOCItems(items: TOCItem[], level = 0, activeId: string | null) {
    if (!items || items.length === 0) return null;

    return (
        <ul className={`space-y-1 ${level > 0 ? 'ml-4 mt-1' : ''}`}>
            {items.map((item, index) => {
                const isActive = activeId === item.url.substring(1);
                return (
                    <li key={index}>
                        <a
                            href={item.url}
                            className={`text-sm max-w-full truncate transition-colors block py-1 border-l-2 pl-2 ${
                                isActive 
                                    ? 'text-accent-foreground border-border bg-accent' 
                                    : 'border-transparent hover:border-border hover:text-foreground'
                            }`}
                        >
                            {item.title}
                        </a>
                        {item.items && renderTOCItems(item.items, level + 1, activeId)}
                    </li>
                );
            })}
        </ul>
    );
}

export function TableOfContents({
    depth = 2,
    className = "",
    children,
    data,
}: TableOfContentsProps) {
    const [tocItems, setTocItems] = useState<TOCItem[]>([]);
    const [activeId, setActiveId] = useState<string | null>(null);

    useEffect(() => {
        if (data) {
            const items = convertManualDataToTOC(data);
            setTocItems(items);
            return;
        }

        const items = generateTOCFromDOM(depth);
        setTocItems(items);

        const observer = new MutationObserver(() => {
            const updatedItems = generateTOCFromDOM(depth);
            setTocItems(updatedItems);
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true,
            attributes: true,
            attributeFilter: ['id']
        });

        return () => observer.disconnect();
    }, [depth, data]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveId(entry.target.id);
                    }
                });
            },
            { rootMargin: '-20% 0% -35% 0%' }
        );

        const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
        headings.forEach((heading) => observer.observe(heading));

        return () => observer.disconnect();
    }, []);

    if (tocItems.length === 0) {
        return null;
    }

    return (
        <div className={cn("border-2 shadow-md p-4 rounded w-52 h-60 overflow-y-auto sidebar-scroll", className)}>
            {children}
            {renderTOCItems(tocItems, 0, activeId)}
        </div>
    );
}