import Layout from "@/components/templates/layout/layout";
import { statusTransactionEnum } from "@/enum/statusTransactioEnum";
import API from "@/services/API";
import { IDataTransactionID } from "@/types/ITransactionID";
import { INumeroUsado } from "@/types/dataBaseType";
import React, { useEffect, useState } from "react";
import styles from "./statusTransaction.module.scss";
import Link from "next/link";
import GoBack from "@/components/atoms/goBack/goBack";
import { IPropsHome } from "@/types/home";

const StatusTransaction = (props: IPropsHome) => {
  const [dataTransaction, setDataTransaction] = useState<IDataTransactionID>();

	const [numberAssigned, setNumberAssigned] = useState<string>();

	const saveNumbers = async (id: string, status: statusTransactionEnum) => {
		const api = new API('/api');
		await api
			.post<INumeroUsado>('saveNumberUse', {
				numero_transaccion: id,
				estado_transaccion: status,
			})
			.then(result => {
				getDataTransaction(id, status);
			});
	};

	const getDataTransaction = async (
		id: string,
		status: statusTransactionEnum,
	) => {
		const api = new API('/api');
		await api
			.post<INumeroUsado>('getNumbers', { idTransaction: id })
			.then(result => {
				if (result.numero === null) {
					saveNumbers(result.numero_transaccion, status);
					return;
				}
				setNumberAssigned(result.numero);
			});
	};

  const callStatus = async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("id");
    const api = new API(process.env.NEXT_PUBLIC_URL_WOMPI ?? "");
    await api
      .getOut<IDataTransactionID>("transactions/" + id)
      .then(async (result) => {
        setDataTransaction(result);

				if (result.data.status === statusTransactionEnum.APPROVED) {
					await getDataTransaction(
						result.data.reference,
						result.data.status,
					);
				}
			});
	};

  useEffect(() => {
    callStatus();
  }, []);

  return (
    <Layout
      logo={props.logo}
      facebook={props.facebook}
      instagram={props.instagram}>
      <div className={styles.container}>
        {/* <Link href='/' className={styles.goBack}>
					{'<'} Volver al inicio{' '}
				</Link> */}
        <GoBack></GoBack>
        <div className={styles.card_status}>
          <div
            className={`${styles.card_status_header} ${
              dataTransaction?.data.status === statusTransactionEnum.APPROVED
                ? styles.card_status_header_success
                : styles.card_status_header_error
            }`}>
            {dataTransaction?.data.status === statusTransactionEnum.APPROVED ? (
              <p>!Pago exitoso¡</p>
            ) : dataTransaction?.data.status ===
              statusTransactionEnum.DECLINED ? (
              <p>!Su pago fue declinado¡</p>
            ) : (
              dataTransaction?.data.status === statusTransactionEnum.ERROR && (
                <p>!Su pago fue declinado¡</p>
              )
            )}
          </div>
          <div
            className={`${styles.card_status_body} ${styles.card_status_bo}`}>
            <div className={styles.card_status_body_content}>
              <div className={styles.table}>
                <p className={styles.table_title}>Datos de la transacción</p>
                <div className={styles.table_data}>
                  <div className={styles.table_data_item}>
                    <p>ID de transacción</p>
                    <b>{dataTransaction?.data.id}</b>
                  </div>
                  <div className={styles.table_data_item}>
                    <p>Fecha</p>
                    <b>
                      {new Date(
                        dataTransaction?.data.created_at ?? ""
                      ).toLocaleDateString()}
                    </b>
                  </div>
                  <div className={styles.table_data_item}>
                    <p>Tu transacción ha sido</p>{" "}
                    <b>
                      {dataTransaction?.data.status ===
                      statusTransactionEnum.APPROVED
                        ? "Aprobada"
                        : dataTransaction?.data.status ===
                          statusTransactionEnum.DECLINED
                        ? "Rechazado"
                        : dataTransaction?.data.status ===
                            statusTransactionEnum.ERROR && "Errado"}
                    </b>
                  </div>
                  <div className={styles.table_data_item}>
                    <p>Tu número de compra es</p>
                    <b>{dataTransaction?.data.reference}</b>
                  </div>

                  {numberAssigned && (
                    <div className={styles.table_data_item}>
                      <p>Tus números asignados </p>
                      <div>
                        {JSON.parse(numberAssigned).map((num: number) => (
                          <span key={"key" + num}>{num}</span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          GgoG
        </div>
      </div>
      {/* <div className={styles.title}>
				<h1>Finalizar compra</h1>
			</div> */}
    </Layout>
  );
};

export default StatusTransaction;
