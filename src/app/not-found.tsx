"use client";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();
  const changeLanguageHandler = (nextLocal: string) => {
    router.replace(`/${nextLocal}`);
  };

  return (
    <html lang="uk">
      <body
        style={{
          backgroundColor: "#f0f0f0",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <h1 style={{ fontSize: "6rem", color: "#333" }}>404</h1>
          <p style={{ fontSize: "2rem", color: "#333" }}>
            Oops! Ця сторінка не існує.
          </p>
          <button
            style={{
              backgroundColor: "#333",
              color: "#fff",
              padding: "0.5rem 1rem",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              margin: "25px",
            }}
            onClick={() => changeLanguageHandler("/")}
          >
            На головну
          </button>
        </div>
      </body>
    </html>
  );
}
