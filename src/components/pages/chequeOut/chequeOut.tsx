import Layout from '@/components/templates/layout/layout';
import styles from './chequeOut.module.scss';
import { useStore } from '@/hook/useStore';
import { useState, useEffect } from 'react';
import { nameStore } from '@/enum/nameStore';
import Button from '@/components/atoms/button/button';
import { useRouter } from 'next/router';

export const ChequeOut = () => {
	const { getStore, deleteStore } = useStore();
	const [numbers, setNumbers] = useState<number[]>();
	const router = useRouter();
	useEffect(() => {
		setNumbers(getStore(nameStore.NUMBERS));
	}, []);

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
						<h2>resumen de pago</h2>
						<div className={styles.cart_numbers}>
							{numbers?.map(num => (
								<span
									className={styles.num}
									key={'number' + num}>
									{num}
								</span>
							))}
						</div>
					</div>
				</div>
			</div>
			<div className={styles.chequeOut_footer}>
				<Button
					type='Button'
					label='Cancelar'
					onClick={() => {
						deleteStore();
						router.push('/');
					}}
				/>
			</div>
		</Layout>
	);
};
