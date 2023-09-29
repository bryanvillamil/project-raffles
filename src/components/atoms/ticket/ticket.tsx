import React from "react";
import Image from "next/image";
import Ticket1 from "@/assets/ticket3.png";
import styles from "./ticket.module.scss";

export const Ticket = ({
  onClick,
  value,
  label,
  recommended,
}: {
  label: string;
  value: string;
  onClick: (param: any) => void;
  recommended?: boolean;
}) => {
  return (
    <button className={styles.ticket} onClick={onClick}>
      <Image src={Ticket1} alt="" className={styles.ticket_img} />
      {recommended && (
        <div className={styles.ticket_ribbon}>
          <span>Recomendado</span>
        </div>
      )}
      <div className={styles.ticket_container}>
        <span>{label}</span>
        <span>{value}</span>
      </div>
    </button>
  );
};
