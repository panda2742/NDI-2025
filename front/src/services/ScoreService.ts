import { ScoreService } from "./ScoreServiceClass.ts";

const svc = new ScoreService({ baseUrl: '/api', timeoutMs: 5000 });

export { svc };