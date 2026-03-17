'use client';

import { useEffect, useMemo, useState } from 'react';

type HeroTerminalProps = {
  title: string;
  tagline: string;
  notes: string[];
};

type Line = {
  type: 'command' | 'output' | 'cursor';
  promptPath?: string;
  command?: string;
  content?: string;
};

export function HeroTerminal({ title, tagline, notes }: HeroTerminalProps) {
  const lines = useMemo<Line[]>(
    () => [
      { type: 'command', promptPath: '~', command: 'whoami' },
      { type: 'output', content: title },
      { type: 'command', promptPath: '~/mission', command: 'cat vision.txt' },
      { type: 'output', content: tagline },
      { type: 'command', promptPath: '~/status', command: 'tail -n 3 build.log' },
      ...notes.map((note) => ({ type: 'output' as const, content: note })),
      { type: 'cursor' },
    ],
    [notes, tagline, title]
  );

  const [visibleCount, setVisibleCount] = useState(1);

  useEffect(() => {
    const timers = lines.slice(1).map((_, index) =>
      window.setTimeout(
        () => {
          setVisibleCount(index + 2);
        },
        260 * (index + 1)
      )
    );

    return () => {
      timers.forEach((timer) => window.clearTimeout(timer));
    };
  }, [lines]);

  return (
    <div className='hero-terminal-preview prompt-block'>
      {lines.slice(0, visibleCount).map((line, index) => {
        if (line.type === 'command') {
          return (
            <p className='terminal-line terminal-line-command' key={`${line.command}-${index}`}>
              <span className='prompt-user'>sakib@portfolio</span>
              <span className='prompt-sep'>:</span>
              <span className='prompt-path'>{line.promptPath}</span>
              <span className='prompt-sign'>$</span>
              <span className='prompt-command'> {line.command}</span>
            </p>
          );
        }

        if (line.type === 'cursor') {
          return (
            <p className='prompt-cursor-line terminal-line' key={`cursor-${index}`}>
              <span className='prompt-user'>sakib@portfolio</span>
              <span className='prompt-sep'>:</span>
              <span className='prompt-path'>~</span>
              <span className='prompt-sign'>$</span>
              <span className='cursor-block' aria-hidden='true' />
            </p>
          );
        }

        return (
          <p className='prompt-output terminal-line terminal-line-output' key={`${line.content}-${index}`}>
            {line.content}
          </p>
        );
      })}
    </div>
  );
}
