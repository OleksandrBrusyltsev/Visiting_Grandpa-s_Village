"use client";
<<<<<<< HEAD

import Error from "next/error";

export default function NotFound() {
  return (
    <html lang="en">
      <body>
        <Error statusCode={404} />
=======
import { Metadata } from "next";
import { useRouter } from "next/navigation";

export const metadata: Metadata = {
  title: "Сторінка не знайдена - 404",
  description:
    "Сторінка, яку ви шукаєте, не знайдена. Поверніться на головну сторінку або скористайтеся навігацією.",
};

export default function NotFound() {
  const router = useRouter();
  const changeLanguageHandler = (nextLocal: string) => {
    router.replace(`/${nextLocal}`);
  };

  return (
    <html lang="en">
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
            Oops! The page you are looking for does not exist.
          </p>
          <button
            style={{
              backgroundColor: "#333",
              color: "#fff",
              padding: "0.5rem 1rem",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
            onClick={() => changeLanguageHandler("/")}
          >
            Go Back Home
          </button>
        </div>
>>>>>>> 5a28b413a7eea541795a727d3e7a5a390ead1c01
      </body>
    </html>
  );
}
