import Layout from '@/components/templates/layout/layout';
import styles from './chequeOut.module.scss';
import { useStore } from '@/hook/useStore';
import { useState, useEffect } from 'react';
import { nameStore } from '@/enum/nameStore';
import Button from '@/components/atoms/button/button';
import { useRouter } from 'next/router';

export const ChequeOut = () => {
	const [numbers, setNumbers] = useState<number[]>();
	const [name, setName] = useState('');
	const [docId, setDocId] = useState('');
	const [email, setEmail] = useState('');
	const [tel, setTel] = useState('');

	const handleChange =
		(setState: (param: string) => void) => (event: any) => {
			setState(event.target.value);
		};

	const { getStore, deleteStore } = useStore();

	const router = useRouter();

	useEffect(() => {
		setNumbers(getStore(nameStore.NUMBERS));
	}, []);

	return (
		<Layout>
			<div className={styles.chequeOut_header}>
				<h1>Finalizar compra</h1>
			</div>
			<div className={styles.chequeOut_container}>
				<div className={styles.column}>
					<h2>Detalles de facturación</h2>
					<form onChange={() => {}}>
						<input
							type='text'
							id='name'
							placeholder='Nombres'
							value={name}
							maxLength={100}
							minLength={1}
							pattern='[a-z]'
							required
							onChange={event => {
								handleChange(setName)(event);
							}}
						/>
						<input
							type='text'
							id='document'
							value={docId}
							pattern={'[/d]'}
							maxLength={11}
							minLength={5}
							required
							placeholder='Cedula'
							onChange={event => {
								handleChange(setDocId)(event);
							}}
						/>
						<input
							type='text'
							id='phone'
							value={tel}
							pattern={'[/d]'}
							maxLength={10}
							required
							minLength={10}
							placeholder='Número de celular'
							onChange={event => {
								handleChange(setTel)(event);
							}}
						/>
						<input
							type='email'
							id='phone'
							value={email}
							maxLength={100}
							placeholder='Correo electrónico'
							onChange={event => {
								handleChange(setEmail)(event);
							}}
						/>
					</form>
				</div>

				<div className={styles.column}>
					<div className={styles.cart}>
						<h2>Tu pedido</h2>
						<div className={styles.card_container}>
							<div className={styles.card_container_data}>
								<div className={styles.data}>
									<p>Nombre Actividad × 21</p>
									<p>$252,000</p>
								</div>
								<div className={styles.data}>
									<p>Subtotal</p>
									<p>$252,000</p>
								</div>
								<div className={styles.data}>
									<p>Total</p>
									<p>$252,000</p>
								</div>
							</div>
							<p>Tus números</p>
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
			</div>
			<div className={styles.chequeOut_footer}>
				<Button
					type='Button'
					typeButton='button'
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
