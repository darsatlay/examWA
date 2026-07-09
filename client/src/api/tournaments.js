import { apiFetch } from "./api";

export function createTournament(difficulty) {
    return apiFetch(
        "/api/tournaments",
        {
            method: "POST",
            body: JSON.stringify({
                difficulty
            })
        }
    );
}

export function joinTournament(code) {
    return apiFetch(
        "/api/tournaments/join",
        {
            method: "POST",
            body: JSON.stringify({
                code
            })
        }
    );
}