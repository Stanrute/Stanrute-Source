import React from "react";
import { Link } from "react-router-dom";
import style from "./index.module.css";
import { useState, useEffect, useRef } from "react";

export default function Navbar({ children, textColor, checkScroll }) {
  const [active, setActive] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const scrolledOnce = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      let mainTop = document.querySelector(".hero").getBoundingClientRect().top;
      if (mainTop < -100 && !scrolledOnce.current) {
        setScrolled(true);
        scrolledOnce.current = true;
      } else if (mainTop >= -100 && scrolledOnce.current) {
        setScrolled(false);
        scrolledOnce.current = false;
      }
    };
    if (checkScroll) {
      window.addEventListener("scroll", handleScroll);

      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }
  }, []);

  return (
    <section
      className={`${style.navbar} ${active ? style.active : ""} ${
        scrolled ? style.scrolled : ""
      } nav`}
      style={{
        color: textColor,
        backgroundColor: scrolled ? "#f8fffc" : "",
        boxShadow: scrolled ? "4px 4px 10px rgba(0, 0, 0, 0.15)" : "",
      }}
    >
      {children}
      <span
        aria-hidden
        className={`${style.toggle} ${active ? style.active : ""}`}
        onClick={() => {
          setActive((prevState) => !prevState);
        }}
      >
        <span></span>
      </span>
      <nav className={active ? style.active : ""}>
        <ul style={{ color: scrolled ? "#000" : textColor }}>
          <li>
            <Link to="/" style={{ color: scrolled ? "#000" : textColor }}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/about" style={{ color: scrolled ? "#000" : textColor }}>
              About us
            </Link>
          </li>
          <li>
            <Link to="/blog" style={{ color: scrolled ? "#000" : textColor }}>
              Blog
            </Link>
          </li>
          <li>
            <Link
              to="/academy"
              style={{ color: scrolled ? "#000" : textColor }}
            >
              Academy
            </Link>
          </li>
          <li>
            <Link
              to="/careers"
              style={{ color: scrolled ? "#000" : textColor }}
            >
              Careers
            </Link>
          </li>
        </ul>
      </nav>
    </section>
  );
}
