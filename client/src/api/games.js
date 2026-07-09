import { apiFetch } from "./api";

export function createGame(difficulty) {
    return apiFetch(
        "/api/games",
        {
            method: "POST",
            body: JSON.stringify({
                difficulty
            })
        }
    );
}


export function fire(matchId, row, col) {
    return apiFetch(
        `/api/games/${matchId}/fire`,
        {
            method: "POST",
            body: JSON.stringify({
                row,
                col
            })
        }
    );
}

export function getMatches() {
    return apiFetch(
        "/api/games"
    );
}

export function getGame(matchId) {
    return apiFetch(
        `/api/games/${matchId}`
    );
}

