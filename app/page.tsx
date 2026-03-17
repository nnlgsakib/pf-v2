import Image from 'next/image';
import type { CSSProperties } from 'react';
import { ContactTerminal } from './components/contact-terminal';
import { HeroTerminal } from './components/hero-terminal';
import { getFeaturedRepos, getGithubProfile, getLanguageStats, profileNarrative } from './lib/github';

const capabilityGroups = [
  {
    path: '/kernel/protocols',
    title: 'Blockchain and protocol architecture',
    detail: 'Consensus mechanics, smart contracts, Layer 2 thinking, and chain-level systems design.',
  },
  {
    path: '/srv/distributed-systems',
    title: 'Distributed storage and networking',
    detail: 'P2P data layers, resilient services, storage engines, replication logic, and systems-grade APIs.',
  },
  {
    path: '/usr/local/devtools',
    title: 'Developer tooling and languages',
    detail: 'Compilers, CLIs, indexers, virtual machines, and tools built for builders.',
  },
  {
    path: '/opt/product-interface',
    title: 'Product-minded full-stack delivery',
    detail: 'Frontend systems and polished interfaces that make deep technical work easier to adopt.',
  },
];

const stackColumns = [
  {
    label: '/stack/core',
    items: ['Rust', 'Go', 'TypeScript', 'Python', 'Solidity', 'C++'],
  },
  {
    label: '/stack/infrastructure',
    items: ['libp2p', 'IPFS', 'PostgreSQL', 'Redis', 'Docker', 'Kubernetes'],
  },
  {
    label: '/stack/interface',
    items: ['Next.js', 'React', 'Svelte', 'Node.js', 'GraphQL', 'Tailwind'],
  },
];

const aiBuilds = [
  {
    path: '/ai/flashgrep',
    title: 'LLM-native code indexing',
    detail:
      'Built `flashgrep` as a fast Rust search/indexing layer for AI agents, focused on incremental updates, file watching, and fast code retrieval.',
  },
  {
    path: '/ai/design-systems',
    title: 'AI-assisted UI/UX systems',
    detail:
      'Created tooling around design intelligence and reusable UI reasoning, showing an interest in systems that help models generate more professional interfaces.',
  },
  {
    path: '/ai/dev-workflows',
    title: 'AI for developer workflows',
    detail:
      'Public work suggests a pattern of building tools for agentic coding, search, automation, and workflow acceleration rather than just chat wrappers.',
  },
];

function formatMonth(date: string) {
  return new Intl.DateTimeFormat('en', {
    month: 'short',
    year: 'numeric',
  }).format(new Date(date));
}

function yearsSince(date: string) {
  return new Date().getFullYear() - new Date(date).getFullYear();
}

export default async function Home() {
  const [profile, featuredRepos, languageStats] = await Promise.all([
    getGithubProfile(),
    getFeaturedRepos(),
    getLanguageStats(),
  ]);

  const metrics = [
    { value: `${profile.public_repos}+`, label: 'public repositories' },
    { value: `${profile.followers}`, label: 'GitHub followers' },
    { value: `${yearsSince(profile.created_at)}+`, label: 'years building publicly' },
    { value: `${featuredRepos.length}`, label: 'selected projects' },
  ];

  const notes = [
    `${profile.public_repos}+ public repositories across experiments, infrastructure, and tooling.`,
    'Original work is prioritized over forks to keep the portfolio signal clean and credible.',
    'Public GitHub presence points to active interest in blockchain infrastructure and distributed systems collaborations.',
  ];

  return (
    <main className='portfolio-shell'>
      <div className='page-noise' aria-hidden='true' />
      <div className='bg-grid' aria-hidden='true' />
      <div className='bg-orb bg-orb-a' aria-hidden='true' />
      <div className='bg-orb bg-orb-b' aria-hidden='true' />
      <div className='bg-orb bg-orb-c' aria-hidden='true' />

      <section className='hero-panel'>
        <header className='topbar'>
          <div>
            <p className='eyebrow'>/home/{profile.login}/portfolio</p>
            <p className='topbar-title'>Systems portfolio</p>
          </div>
          <nav className='topbar-links' aria-label='Primary'>
            <a href='#projects'>/projects</a>
            <a href='#capabilities'>/capabilities</a>
            <a href='#contact'>/contact</a>
          </nav>
        </header>

        <div className='hero-grid'>
          <div className='hero-copy terminal-panel'>
            <div className='terminal-bar'>
              <span />
              <span />
              <span />
            </div>

            <div className='hero-intro-strip'>
              <span className='hero-badge'>Open to infrastructure and product work</span>
              <span className='hero-badge'>Blockchain, distributed systems, AI tooling</span>
            </div>

            <p className='eyebrow'>/roles/blockchain-architect/full-stack-engineer</p>
            <h1>{profile.name}</h1>
            <p className='hero-title-line'>{profileNarrative.title}</p>
            <p className='hero-summary'>{profileNarrative.shortBio}</p>

            <div className='hero-proof-strip'>
              <span>protocols</span>
              <span>distributed systems</span>
              <span>developer tools</span>
              <span>AI workflows</span>
            </div>

            <div className='hero-actions'>
              <a className='button-primary' href='#projects'>
                ./open_featured_projects.sh
              </a>
              <a className='button-secondary' href={profile.html_url} target='_blank' rel='noreferrer'>
                git remote -v
              </a>
            </div>

            <HeroTerminal title={profileNarrative.title} tagline={profileNarrative.tagline} notes={notes} />
          </div>

          <div className='hero-side-stack'>
            <aside className='identity-card terminal-panel'>
              <div className='identity-hero'>
                <div className='identity-avatar-wrap'>
                  <Image
                    src={profile.avatar_url}
                    alt={`${profile.name} avatar`}
                    className='avatar'
                    width={520}
                    height={520}
                  />
                </div>
                <div className='identity-meta'>
                  <p className='eyebrow'>/etc/profile.d/operator.conf</p>
                  <h2>{profile.login}</h2>
                  <p>
                    Systems-first builder shipping protocol logic, infrastructure tooling, and interfaces with clear
                    product intent.
                  </p>
                </div>
              </div>

              <div className='signal-block'>
                {metrics.map((metric) => (
                  <div key={metric.label}>
                    <strong>{metric.value}</strong>
                    <span>{metric.label}</span>
                  </div>
                ))}
              </div>

              <ContactTerminal />
            </aside>

            <aside className='language-terminal-card terminal-panel'>
              <div className='terminal-bar'>
                <span />
                <span />
                <span />
              </div>
              <div className='language-terminal-head'>
                <p className='eyebrow'>Language overview</p>
                <span>GitHub activity</span>
              </div>
              <p className='language-card-summary'>
                Based on public GitHub repositories and recent visible language distribution.
              </p>
              <a
                className='stats-image-link'
                href='https://github-readme-stats.vercel.app/api/top-langs/?username=nnlgsakib'
                target='_blank'
                rel='noreferrer'
              >
                <Image
                  className='stats-image'
                  src='https://github-readme-stats.vercel.app/api/top-langs/?username=nnlgsakib&layout=compact&langs_count=8&hide_border=true&bg_color=00000000&title_color=7dffbf&text_color=d7f6ea&icon_color=56d6ff'
                  alt='Top languages from GitHub for NLG Sakib'
                  width={495}
                  height={195}
                  unoptimized
                />
              </a>
              <div className='language-chip-list'>
                {languageStats.slice(0, 6).map((language) => (
                  <span className='language-chip' key={language.name}>
                    <span className='language-chip-dot' style={{ backgroundColor: language.color } as CSSProperties} />
                    {language.name}
                  </span>
                ))}
              </div>
              <div className='language-chip-meta'>
                <span>Live public data</span>
                <span>{languageStats.length} primary languages</span>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className='metrics-ribbon' aria-label='Snapshot'>
        <p>/runtime/focus</p>
        <span>protocol design</span>
        <span>distributed data</span>
        <span>developer tooling</span>
        <span>product interfaces</span>
      </section>

      <section className='section-block' id='projects'>
        <div className='section-heading'>
          <p className='eyebrow'>/srv/projects/featured</p>
          <h2>Selected original repositories, surfaced through the GitHub API and framed for real-world signal.</h2>
        </div>

        <div className='project-grid'>
          {featuredRepos.map((repo) => (
            <article className='project-card terminal-panel' key={repo.id}>
              <div className='project-card-top'>
                <span className='project-category'>{repo.category}</span>
                <span className='project-updated'>last update {formatMonth(repo.updated_at)}</span>
              </div>

              <div className='project-main'>
                <div className='project-path'>/repos/{repo.name}</div>
                <h3>{repo.name}</h3>
                <p className='project-description'>{repo.description ?? repo.reason}</p>
                <p className='project-reason'>{repo.reason}</p>
              </div>

              <div className='project-stats'>
                <span>lang :: {repo.language ?? 'multi-stack'}</span>
                <span>stars :: {repo.stargazers_count}</span>
                <span>forks :: {repo.forks_count}</span>
              </div>

              <div className='project-links'>
                <a href={repo.html_url} target='_blank' rel='noreferrer'>
                  open repo
                </a>
                {repo.homepage ? (
                  <a href={repo.homepage} target='_blank' rel='noreferrer'>
                    open live
                  </a>
                ) : null}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className='section-block ai-section'>
        <div className='section-heading compact'>
          <p className='eyebrow'>/srv/ai/builds</p>
          <h2>AI work focused on tooling, retrieval, and systems leverage.</h2>
        </div>
        <div className='ai-card-list ai-grid'>
          {aiBuilds.map((item) => (
            <article className='ai-card terminal-panel' key={item.title}>
              <div className='project-path'>{item.path}</div>
              <h3>{item.title}</h3>
              <p>{item.detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section className='section-block capabilities-layout' id='capabilities'>
        <div>
          <div className='section-heading compact'>
            <p className='eyebrow'>/usr/share/capabilities</p>
            <h2>Low-level depth, product-ready restraint, and a strong systems identity.</h2>
          </div>

          <div className='capability-list'>
            {capabilityGroups.map((item) => (
              <article className='capability-card terminal-panel' key={item.title}>
                <div className='project-path'>{item.path}</div>
                <h3>{item.title}</h3>
                <p>{item.detail}</p>
              </article>
            ))}
          </div>
        </div>

        <aside className='stack-card terminal-panel'>
          <p className='eyebrow'>/var/lib/stack-atlas</p>
          {stackColumns.map((column) => (
            <div key={column.label} className='stack-group'>
              <h3>{column.label}</h3>
              <ul>
                {column.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </aside>
      </section>

      <section className='section-block closing-panel terminal-panel' id='contact'>
        <div className='section-heading compact'>
          <p className='eyebrow'>/bin/connect</p>
          <h2>Available for sharp infrastructure work, technical product builds, and high-trust collaborations.</h2>
        </div>

        <div className='closing-grid'>
          <div className='closing-copy'>
            <p>
              This portfolio is intentionally dark, technical, and restrained. It reflects a builder whose public work
              leans toward protocols, distributed storage, system design, tooling, and serious engineering craft rather
              than trend-driven demos.
            </p>
          </div>

          <div className='closing-actions'>
            <a className='button-primary' href={profileNarrative.contact.email}>
              ./start_conversation
            </a>
            <a className='button-secondary' href={profileNarrative.contact.linkedin} target='_blank' rel='noreferrer'>
              open linkedin
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
