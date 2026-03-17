const GITHUB_USERNAME = 'nnlgsakib';

export type GithubProfile = {
  login: string;
  name: string;
  avatar_url: string;
  html_url: string;
  followers: number;
  following: number;
  public_repos: number;
  created_at: string;
};

export type GithubRepo = {
  id: number;
  name: string;
  html_url: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  homepage: string | null;
  updated_at: string;
  fork: boolean;
};

export type FeaturedRepo = GithubRepo & {
  reason: string;
  category: string;
};

export type LanguageStat = {
  name: string;
  color: string;
  repoCount: number;
  share: number;
  summary: string;
};

const fallbackProfile: GithubProfile = {
  login: GITHUB_USERNAME,
  name: 'NLG Sakib',
  avatar_url: 'https://avatars.githubusercontent.com/u/107909889?v=4',
  html_url: 'https://github.com/nnlgsakib',
  followers: 33,
  following: 74,
  public_repos: 423,
  created_at: '2022-06-21T06:07:29Z',
};

const featuredProjectNotes: Record<string, { reason: string; category: string }> = {
  onvm: {
    reason: 'An ambitious virtual machine concept for scalable computation and decentralized storage.',
    category: 'virtual machine',
  },
  wwfsdb: {
    reason: 'Turns distributed storage ideas into a practical SQL-style database story with visible traction.',
    category: 'distributed database',
  },
  'open-hash-db': {
    reason:
      'A content-addressable storage platform that shows strong systems thinking across networking and data layers.',
    category: 'storage infrastructure',
  },
  nlang: {
    reason: 'Building a language and compiler toolchain is a rare systems signal and a standout portfolio anchor.',
    category: 'language design',
  },
  flashgrep: {
    reason: 'A focused Rust tool for LLM-era code search that is immediately legible to technical recruiters.',
    category: 'developer tooling',
  },
  'nlg-bft': {
    reason: 'Consensus research translated into working code, highlighting blockchain protocol depth.',
    category: 'consensus systems',
  },
  'openhashdb-ui': {
    reason: 'Shows product thinking by pairing infrastructure work with an accessible interface layer.',
    category: 'product interface',
  },
  'openhash-desktop': {
    reason: 'Extends core infrastructure into a desktop experience, proving end-to-end execution.',
    category: 'desktop tooling',
  },
};

const fallbackRepos: GithubRepo[] = [
  {
    id: 1,
    name: 'onvm',
    html_url: 'https://github.com/nnlgsakib/onvm',
    description: 'Open Network Virtual Machine for scalable computation and decentralized storage.',
    language: 'TypeScript',
    stargazers_count: 0,
    forks_count: 0,
    homepage: null,
    updated_at: '2026-01-01T00:00:00Z',
    fork: false,
  },
  {
    id: 2,
    name: 'wwfsdb',
    html_url: 'https://github.com/nnlgsakib/wwfsdb',
    description: 'An IPFS/WWFS-powered distributed SQL database.',
    language: 'TypeScript',
    stargazers_count: 6,
    forks_count: 1,
    homepage: null,
    updated_at: '2026-01-01T00:00:00Z',
    fork: false,
  },
  {
    id: 3,
    name: 'open-hash-db',
    html_url: 'https://github.com/nnlgsakib/open-hash-db',
    description: 'Distributed content-addressable storage with libp2p networking, CLI tooling, and APIs.',
    language: 'Go',
    stargazers_count: 0,
    forks_count: 0,
    homepage: null,
    updated_at: '2026-01-01T00:00:00Z',
    fork: false,
  },
  {
    id: 4,
    name: 'nlang',
    html_url: 'https://github.com/nnlgsakib/nlang',
    description: 'A modern systems programming language with Python-like syntax and multi-backend compilation.',
    language: 'Rust',
    stargazers_count: 2,
    forks_count: 0,
    homepage: null,
    updated_at: '2026-01-01T00:00:00Z',
    fork: false,
  },
  {
    id: 5,
    name: 'flashgrep',
    html_url: 'https://github.com/nnlgsakib/flashgrep',
    description: 'Blazing fast code indexing for LLM agents with incremental updates and file watching.',
    language: 'Rust',
    stargazers_count: 0,
    forks_count: 0,
    homepage: null,
    updated_at: '2026-01-01T00:00:00Z',
    fork: false,
  },
  {
    id: 6,
    name: 'nlg-bft',
    html_url: 'https://github.com/nnlgsakib/nlg-bft',
    description: 'A modified IBFT implementation exploring blockchain consensus design.',
    language: 'Go',
    stargazers_count: 0,
    forks_count: 0,
    homepage: null,
    updated_at: '2026-01-01T00:00:00Z',
    fork: false,
  },
];

const languageNotes: Record<string, { color: string; summary: string }> = {
  Rust: {
    color: '#dea584',
    summary: 'systems, tooling, performance',
  },
  Go: {
    color: '#00add8',
    summary: 'networking, services, infra',
  },
  TypeScript: {
    color: '#3178c6',
    summary: 'platforms, products, DX',
  },
  Python: {
    color: '#ffd43b',
    summary: 'automation, AI flows, rapid systems work',
  },
  Solidity: {
    color: '#8a92b2',
    summary: 'smart contracts, chain logic',
  },
  'C++': {
    color: '#649ad2',
    summary: 'low-level systems exploration',
  },
  Svelte: {
    color: '#ff3e00',
    summary: 'product interfaces, fast frontends',
  },
  JavaScript: {
    color: '#f1e05a',
    summary: 'web platforms, scripting, iteration',
  },
};

async function getOwnedRepos(): Promise<GithubRepo[]> {
  try {
    return await githubFetch<GithubRepo[]>(`/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100&type=owner`);
  } catch {
    return fallbackRepos;
  }
}

async function githubFetch<T>(path: string): Promise<T> {
  const response = await fetch(`https://api.github.com${path}`, {
    headers: {
      Accept: 'application/vnd.github+json',
      'User-Agent': 'nnlgsakib-portfolio',
    },
    next: { revalidate: 3600 },
  });

  if (!response.ok) {
    throw new Error(`GitHub request failed: ${response.status}`);
  }

  return response.json() as Promise<T>;
}

export async function getGithubProfile(): Promise<GithubProfile> {
  try {
    return await githubFetch<GithubProfile>(`/users/${GITHUB_USERNAME}`);
  } catch {
    return fallbackProfile;
  }
}

export async function getFeaturedRepos(limit = 6): Promise<FeaturedRepo[]> {
  const repos = await getOwnedRepos();

  const originals = repos.filter((repo) => !repo.fork && featuredProjectNotes[repo.name]);

  const ranked = Object.keys(featuredProjectNotes)
    .map((name) => originals.find((repo) => repo.name === name))
    .filter((repo): repo is GithubRepo => Boolean(repo))
    .slice(0, limit)
    .map((repo) => ({
      ...repo,
      ...featuredProjectNotes[repo.name],
    }));

  if (ranked.length > 0) {
    return ranked;
  }

  return fallbackRepos.slice(0, limit).map((repo) => ({
    ...repo,
    ...featuredProjectNotes[repo.name],
  }));
}

export async function getLanguageStats(limit = 6): Promise<LanguageStat[]> {
  const repos = await getOwnedRepos();
  const originalRepos = repos.filter((repo) => !repo.fork && repo.language);
  const languageCounts = new Map<string, number>();

  for (const repo of originalRepos) {
    const language = repo.language;

    if (!language) {
      continue;
    }

    languageCounts.set(language, (languageCounts.get(language) ?? 0) + 1);
  }

  const ranked = [...languageCounts.entries()].sort((a, b) => b[1] - a[1]).slice(0, limit);

  const total = ranked.reduce((sum, [, count]) => sum + count, 0);

  if (ranked.length === 0 || total === 0) {
    ranked.push(['Rust', 12], ['TypeScript', 11], ['Go', 10], ['Python', 7], ['Solidity', 6], ['C++', 4]);
  }

  const fallbackTotal = ranked.reduce((sum, [, count]) => sum + count, 0);

  return ranked.map(([name, repoCount]) => {
    const note = languageNotes[name] ?? {
      color: '#7dffbf',
      summary: 'systems and product experimentation',
    };

    return {
      name,
      color: note.color,
      repoCount,
      share: Math.round((repoCount / fallbackTotal) * 100),
      summary: note.summary,
    };
  });
}

export const profileNarrative = {
  title: 'Blockchain architect, systems engineer, and product builder',
  tagline:
    'Building distributed systems, developer tools, and modern products with a strong infrastructure foundation.',
  shortBio:
    'NLG Sakib works across blockchain infrastructure, distributed data systems, AI tooling, and full-stack product development, moving comfortably from protocol design to production-ready interfaces.',
  contact: {
    github: 'https://github.com/nnlgsakib',
    linkedin: 'https://www.linkedin.com/in/nlg-sakib-338339279/',
    twitter: 'https://twitter.com/nlg_sakib',
    email: 'mailto:nlgarts@outlook.com',
  },
};
