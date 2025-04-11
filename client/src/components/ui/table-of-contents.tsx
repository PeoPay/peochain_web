import React from "react";

interface Section {
  id: string;
  label: string;
}

interface TableOfContentsProps {
  sections: Section[];
  activeSection: string;
  onClick: (id: string) => void;
}

export function TableOfContents({ sections, activeSection, onClick }: TableOfContentsProps) {
  return (
    <div className="bg-background/50 backdrop-blur-sm p-4 rounded-2xl border border-primary/10">
      <h3 className="text-lg font-semibold mb-4">Table of Contents</h3>
      <nav>
        <ul className="space-y-2">
          {sections.map((section) => (
            <li key={section.id}>
              <button
                onClick={() => onClick(section.id)}
                className={`w-full text-left py-2 px-3 rounded-lg transition-colors ${
                  activeSection === section.id
                    ? "bg-primary/10 text-primary font-medium"
                    : "hover:bg-primary/5 text-foreground/80"
                }`}
              >
                {section.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}