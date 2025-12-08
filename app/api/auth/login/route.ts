import https from "https";

// Disable SSL certificate validation for self-signed certificates (development only)
if (process.env.NODE_ENV === "development") {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
}

// Backend base URL (set in environment). Falls back to localhost for development.
const BACKEND_URL = process.env.BACKEND_URL || "https://localhost:44339";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const response = await fetch(`${BACKEND_URL}/user/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    if (!response.ok) {
      return Response.json(
        { error: data.message || "Email ou palavra-passe incorretos" },
        { status: response.status }
      );
    }

    return Response.json(data, { status: response.status });
  } catch (error) {
    console.error("Login proxy error:", error);
    return Response.json(
      { error: "Erro ao comunicar com o servidor" },
      { status: 500 }
    );
  }
}
