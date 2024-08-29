"use client";
import Link from "next/link";
import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import Button from "../components/ui/Button/Button";
import s from "../components/NotFound/NotFound.module.scss";

export default function NotFound() {
  return (
    <html lang="uk">
      <body>
        <header>
          <Header />
        </header>

        {/* <div style={{ textAlign: "center" }}>
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
        </div> */}
        <main className={`${s.wrapper} container`}>
          <h1 className={s.title}>щось пішло не так, вибачай</h1>
          <div className={s.description}>
            <div className={s.number}>4</div>
            <div className={s.number}>
              0<div className={s.grandpa}></div>
            </div>
            <div className={s.number}>4</div>
          </div>
          <Link href="/" className={s.home}>
            <Button label="На Головну" />
          </Link>
        </main>
        <Footer />
      </body>
    </html>
  );
}
