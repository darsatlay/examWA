import { apiFetch } from "./api";

export function login(credentials) {
    return apiFetch(
        "/api/sessions",
        {
            method: "POST",
            body: JSON.stringify(credentials)
        }
    );
}

export function logout() {
    return apiFetch(
        "/api/sessions/current",
        {
            method: "DELETE"
        }
    );
}

export function getCurrentUser() {
    return apiFetch(
        "/api/sessions/current"
    );
}
export function register(credentials) {
    return apiFetch(
        "/api/sessions/register",
        {
            method: "POST",
            body: JSON.stringify(credentials)
        }
    );

}
