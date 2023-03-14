// "use client";
// import { useSelector } from "react-redux";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "./page.module.css";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  // const store = useSelector((state) => state);
  // console.log(store, "store");
  return <main className={styles.main}>Home</main>;
}
