

export type Metadata = Record<string, any> | null;

export type Score = {
  id: number;
  player_name: string;
  score: number;
  metadata: Metadata;
  created_at: string;
};

export type PostScorePayload = {
  player_name: string;
  score: number;
  metadata?: Metadata;
};

export type PostScoreResponse = {
  score: Score;
  rank: number;
};

export type TopResponse = {
  top: Score[];
};

export type PaginatedResponse = {
  items: Score[];
  limit: number;
  offset: number;
};

export type RankResponse = {
  player_name: string;
  best_score: Score;
  rank: number;
};

export class HTTPError extends Error {
  status: number;
  details?: any;
  constructor(status: number, message: string, details?: any) {
    super(message);
    this.status = status;
    this.details = details;
    Object.setPrototypeOf(this, HTTPError.prototype);
  }
}

export type ScoreServiceOptions = {
  baseUrl?: string; // ex: "http://localhost:3000"
  timeoutMs?: number; // default 8000
};

export class ScoreService {
  private baseUrl: string;
  private timeoutMs: number;

  constructor(opts?: ScoreServiceOptions) {
    this.baseUrl = opts?.baseUrl?.replace(/\/+$/, '') ?? '';
    this.timeoutMs = opts?.timeoutMs ?? 8000;
  }

  private async request<T>(path: string, init?: RequestInit, timeoutMs?: number): Promise<T> {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), timeoutMs ?? this.timeoutMs);
    try {
      const res = await fetch(this.baseUrl + path, {
        headers: { 'Content-Type': 'application/json', ...(init?.headers || {}) },
        signal: controller.signal,
        ...init
      });
      clearTimeout(timeout);
      const text = await res.text();
      const data = text ? JSON.parse(text) : undefined;
      if (!res.ok) throw new HTTPError(res.status, data?.error ?? res.statusText, data);
      return data as T;
    } catch (err) {
      if ((err as Error).name === 'AbortError') throw new Error('RequestTimeout');
      throw err;
    }
  }

  // POST /scores
  async createScore(payload: PostScorePayload): Promise<PostScoreResponse> {
    return this.request<PostScoreResponse>('/scores', {
      method: 'POST',
      body: JSON.stringify(payload)
    });
  }

  // GET /scores/top?limit=10
  async getTop(limit = 10): Promise<Score[]> {
    const data = await this.request<TopResponse>(`/scores/top?limit=${encodeURIComponent(String(limit))}`, { method: 'GET' });
    return data.top;
  }

  // GET /scores?limit=&offset=
  async getScores(limit = 20, offset = 0): Promise<PaginatedResponse> {
    const q = `?limit=${encodeURIComponent(String(limit))}&offset=${encodeURIComponent(String(offset))}`;
    return this.request<PaginatedResponse>(`/scores${q}`, { method: 'GET' });
  }

  // GET /scores/rank?player_name=Alice
  async getRank(player_name: string): Promise<RankResponse> {
    const q = `?player_name=${encodeURIComponent(player_name)}`;
    return this.request<RankResponse>(`/scores/rank${q}`, { method: 'GET' });
  }

  // GET /health
  async health(): Promise<{ status: string }> {
    return this.request<{ status: string }>('/health', { method: 'GET' });
  }
}