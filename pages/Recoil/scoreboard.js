const SCOREBOARD_URL = "https://thriftyjeroen.nl/api/score/board?level=1&game=Recoil";
const MAX_ENTRIES = 10;

async function fetchScores() {
  const scoreboardDiv = document.getElementById("scoreboard");
  if (!scoreboardDiv) return;

  scoreboardDiv.textContent = "Loading scores...";

  try {
    const response = await fetch(SCOREBOARD_URL, { cache: "no-store" });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    if (!data || !Array.isArray(data.scores)) {
      throw new Error("Invalid response format");
    }

    renderScores(data.scores);
  } catch (err) {
    console.error("❌ Failed to fetch scores:", err);
    scoreboardDiv.textContent = "Error loading scores. Please try again.";
  }
}

function renderScores(scores) {
  const scoreboardDiv = document.getElementById("scoreboard");
  if (!scoreboardDiv) return;

  if (scores.length === 0) {
    scoreboardDiv.textContent = "No scores found.";
    return;
  }

  // Clear existing content
  scoreboardDiv.innerHTML = "";

  const list = document.createElement("ol");
  list.className = "score-list";

  for (let i = 0; i < Math.min(scores.length, MAX_ENTRIES); i++) {
    const s = scores[i];
    const li = document.createElement("li");
    li.textContent = `${i + 1}. ${s.name} — ${s.score}`;
    list.appendChild(li);
  }

  scoreboardDiv.appendChild(list);
}

// Refresh button
document.getElementById("refresh-scores")?.addEventListener("click", fetchScores);

// Auto-fetch on page load
window.addEventListener("DOMContentLoaded", fetchScores);
