const SERVER_URL = import.meta.env.VITE_API_URL || "https://examwa-4.onrender.com";

export async function apiFetch(path, options = {}) {

    const response = await fetch(

        SERVER_URL + path,

        {
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                ...(options.headers || {})
            },
            ...options

        }

    );

    if (!response.ok) {
        let error = {
            error: response.statusText
        };
        try {
            error = await response.json();
        }


        catch {}
        throw new Error(error.error);
    }

    if (response.status === 204)
        return null;
    return response.json();
}
