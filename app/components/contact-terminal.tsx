'use client';

import { useState } from 'react';

type ContactItem = {
  label: string;
  command: string;
  href: string;
  external?: boolean;
};

const contacts: ContactItem[] = [
  { label: 'github', command: 'open github', href: 'https://github.com/nnlgsakib', external: true },
  {
    label: 'linkedin',
    command: 'open linkedin',
    href: 'https://www.linkedin.com/in/nlg-sakib-338339279/',
    external: true,
  },
  { label: 'x', command: 'open x', href: 'https://twitter.com/nlg_sakib', external: true },
  { label: 'email', command: 'open email', href: 'mailto:me@nlgsakib.online' },
];

export function ContactTerminal() {
  const [output, setOutput] = useState('tap a command to open a channel');

  function handleRun(item: ContactItem) {
    setOutput(`running: ${item.command}`);

    window.setTimeout(() => {
      if (item.external) {
        window.open(item.href, '_blank', 'noopener,noreferrer');
      } else {
        window.location.href = item.href;
      }
      setOutput(`executed: ${item.command}`);
    }, 140);
  }

  return (
    <div className='contact-terminal'>
      <div className='contact-strip'>
        {contacts.map((item) => (
          <button key={item.label} type='button' className='contact-action' onClick={() => handleRun(item)}>
            <span className='contact-command'>$</span>
            <span className='contact-target'>{item.label}</span>
          </button>
        ))}
      </div>

      <div className='contact-output'>
        <p>
          <span className='prompt-user'>sakib@portfolio</span>
          <span className='prompt-sep'>:</span>
          <span className='prompt-path'>~/contacts</span>
          <span className='prompt-sign'>$</span>
          <span className='prompt-command'> {output}</span>
        </p>
      </div>
    </div>
  );
}
