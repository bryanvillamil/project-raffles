import React from "react";
import styles from "./layout.module.scss";
import Image from "next/image";
import Link from "next/link";
import facebook from "@/assets/facebook.png";
import instagram from "@/assets/instagram.png";
import { useModal } from "@/hook/useLoading";
import { ILogo } from "@/types/home";

const Layout = ({
  children,
  logo,
  facebook: urlFacebook,
  instagram: urlInstagram,
}: {
  children: React.ReactNode;
  logo: ILogo;
  facebook: string;
  instagram: string;
}) => {
  const { loading } = useModal();

  const today = new Date();
  const year = today.getFullYear();

  return (
    <div className={styles.container_principal}>
      <header className={styles.header}>
        <div className={styles.header_logo}>
          <h1>
            <Link href="/">
              <Image src={logo.url} alt={logo.title} width={150} height={130} />
            </Link>
          </h1>
        </div>
      </header>
      <main className={styles.container}>{children}</main>
      <footer className={styles.footer}>
        <div className={styles.footer_info}>
          <p>
            © {year} <span>All rights reserved.</span>
          </p>
        </div>
        <div className={styles.footer_container}>
          <a
            href={urlFacebook}
            rel="noopener noreferrer"
            target="_blank"
            className={styles.button_social}>
            <Image src={facebook} alt="icon-facebook"></Image>
          </a>
          <a
            href={urlInstagram}
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
