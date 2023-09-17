import { current } from "@reduxjs/toolkit";
import styles from "../../style/Nav/MenuBar.module.css";
import { useEffect, useState, useRef } from "react";
export default function ({ menubar }: any) {
  const [toggle, setToggle] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const toggleRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    function handleResize() {
      setWindowWidth(window.innerWidth);
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const MenuTeb = (e: any) => {
    e.stopPropagation();
    if (menubar.current && toggleRef.current) {
      if (toggle === false) {
        menubar.current.style.transform = "translateX(0px)";
        toggleRef.current.style.background = "#4db9ff";
        setToggle(true);
      } else {
        menubar.current.style.transform = "translateX(-200px)";
        toggleRef.current.style.background = "white";
        setToggle(false);
      }
    }
  };

  if (windowWidth > 1024) {
    if (menubar.current) {
      menubar.current.style.transform = "translateX(0px)";
    }
    return null;
  } else {
    if (menubar.current && !toggle) {
      menubar.current.style.transform = "translateX(-200px)";
    }
  }
  return (
    <div className={styles.center} ref={toggleRef}>
      <input type="checkbox" id="menuicon" onClick={MenuTeb} />
      <label htmlFor="menuicon">
        <span></span>
        <span></span>
        <span></span>
      </label>
    </div>
  );
}
