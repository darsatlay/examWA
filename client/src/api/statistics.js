import { apiFetch } from "./api";

export function getStatistics() {
    return apiFetch(
        "/api/statistics"
    );
}