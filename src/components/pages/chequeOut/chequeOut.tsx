import Layout from '@/components/templates/layout/layout';
import styles from './chequeOut.module.scss';

export const ChequeOut = () => {
	return (
		<Layout>
			<h1>Detalles de pago</h1>
			<div className={styles.chequeOut_container}>
				<div className={styles.column}>
					<h3>Datos de contacto</h3>
					<form>
						<div>
							{/* <label htmlFor='name'>Nombres</label> */}
							<input
								type='text'
								id='name'
								placeholder='Nombres'
							/>
						</div>
						<div>
							{/* <label htmlFor='document'>Cedula</label> */}
							<input
								type='text'
								id='document'
								placeholder='Cedula'
							/>
						</div>
						<div>
							{/* <label htmlFor='phone'>Numero de celular</label> */}
							<input
								type='text'
								id='phone'
								placeholder='Numero de celular'
							/>
						</div>
						<div>
							{/* <label htmlFor='phone'>Numero de celular</label> */}
							<input
								type='email'
								id='phone'
								placeholder='Correo electronic'
							/>
						</div>
						<button>guardar</button>
					</form>
				</div>

				<div className={styles.column}>
					<div className={styles.cart}>
						<h3>resumen de pago</h3>
					</div>
				</div>
			</div>
		</Layout>
	);
};
