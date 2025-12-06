import https from "https";

// Disable SSL certificate validation for self-signed certificates (development only)
if (process.env.NODE_ENV === "development") {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    //TODO: CHANGE HARDCODED URL
    const response = await fetch("https://localhost:44339/user/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    if (!response.ok) {
      return Response.json(
        { error: data.message || "Erro ao registar" },
        { status: response.status }
      );
    }

    return Response.json(data, { status: response.status });
  } catch (error) {
    console.error("Register proxy error:", error);
    return Response.json(
      { error: "Erro ao comunicar com o servidor" },
      { status: 500 }
    );
  }
}
