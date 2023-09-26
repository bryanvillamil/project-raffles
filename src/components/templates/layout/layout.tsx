import React from "react";
import styles from "./layout.module.scss";
import Image from "next/image";
import Link from "next/link";
import img from "@/assets/logo.svg";
import facebook from "@/assets/facebook.svg";
import instagram from "@/assets/instagram.svg";
import { useModal } from "@/hook/useLoading";
import { ILogo } from "@/types/home";

const Layout = ({
  children,
  logo,
}: {
  children: React.ReactNode;
  logo: ILogo;
}) => {
  const { loading } = useModal();

  return (
    <div className={styles.container_principal}>
      <header className={styles.header}>
        <div className={styles.header_logo}>
          <Link href="/">
            <Image src={logo.url} alt={logo.title} width={150} height={130} />
          </Link>
        </div>
      </header>
      <main className={styles.container}>{children}</main>
      <footer className={styles.footer}>
        <div className={styles.footer_container}>
          <a
            href="#" // Tomar link de contentful
            rel="noopener noreferrer"
            target="_blank"
            className={styles.button_social}>
            <Image src={facebook} alt="icon-facebook"></Image>
          </a>
          <a
            href="#" // Tomar link de contentful
            rel="noopener noreferrer"
            target="_blank"
            className={styles.button_social}>
            <Image src={instagram} alt="icon-facebook"></Image>
          </a>
        </div>
      </footer>
      {loading && (
        <div className={styles.loading}>
          <div></div>
        </div>
      )}
    </div>
  );
};

export default Layout;
