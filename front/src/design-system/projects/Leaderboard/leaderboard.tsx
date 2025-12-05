import { useEffect, useState } from "react";
import { svc } from "../../../services/ScoreService.ts";

export const LeaderboardProject = () => {
  const [scores, setScores] = useState<Array<{
    id: number;
    player_name: string;
    score: number;
    metadata?: Record<string, any> | null;
    created_at: string;
  }>>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(0);
  const [limit] = useState(10); // nombre d'éléments par page

  const fetchScores = async (pageNumber: number) => {
    setLoading(true);
    setError(null);
    try {
      const offset = pageNumber * limit;
      const response = await svc.getScores(limit, offset);
      setScores(response.items);
    } catch (err) {
      console.error(err);
      setError("Impossible de charger le leaderboard");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchScores(page);
  }, [page]);

  const handleNext = () => {
    if (scores.length === limit) setPage(prev => prev + 1);
  };

  const handlePrev = () => {
    if (page > 0) setPage(prev => prev - 1);
  };

  const handleReload = () => {
    fetchScores(page);
  };

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "flex-start",
      width: "100%",
      height: "100%",
      padding: "20px",
      fontFamily: "'Press Start 2P', monospace",
      backgroundColor: "#A1E5AB",
      color: "#000",
    }}>
      <h2 className="snake-font" style={{ marginBottom: "20px" }}>Leaderboard</h2>

      {loading && <div className="snake-font">Loading...</div>}
      {error && <div className="snake-font" style={{ color: "red" }}>{error}</div>}

      {!loading && !error && scores.length === 0 && (
        <div className="snake-font">No scores yet!</div>
      )}

      {!loading && !error && scores.length > 0 && (
        <>
          <table style={{ borderCollapse: "collapse", width: "80%", marginBottom: "10px" }}>
            <thead>
              <tr>
                <th className="snake-font" style={{ textAlign: "left", padding: "5px" }}>Rank</th>
                <th className="snake-font" style={{ textAlign: "left", padding: "5px" }}>Player</th>
                <th className="snake-font" style={{ textAlign: "left", padding: "5px" }}>Score</th>
              </tr>
            </thead>
            <tbody>
              {scores.map((score, index) => (
                <tr key={score.id} style={{ backgroundColor: index % 2 === 0 ? "#CDF5C2" : "#B3E5A9" }}>
                  <td className="snake-font" style={{ padding: "5px" }}>{page * limit + index + 1}</td>
                  <td className="snake-font" style={{ padding: "5px" }}>{score.player_name}</td>
                  <td className="snake-font" style={{ padding: "5px" }}>{score.score}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination buttons */}
          <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
            <button
              className="snake-font"
              disabled={page === 0}
              onClick={handlePrev}
              style={{ cursor: page === 0 ? "not-allowed" : "pointer", padding: "5px 10px" }}
            >
              Previous
            </button>
            <button
              className="snake-font"
              disabled={scores.length < limit}
              onClick={handleNext}
              style={{ cursor: scores.length < limit ? "not-allowed" : "pointer", padding: "5px 10px" }}
            >
              Next
            </button>
            <button
              className="snake-font"
              onClick={handleReload}
              style={{ cursor: "pointer", padding: "5px 10px" }}
            >
              Reload
            </button>
          </div>

          <div className="snake-font">Page {page + 1}</div>
        </>
      )}
    </div>
  );
};