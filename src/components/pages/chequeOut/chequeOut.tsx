import Button from '@/components/atoms/button/button';
import GoBack from '@/components/atoms/goBack/goBack';
import Layout from '@/components/templates/layout/layout';
import { nameStore } from '@/enum/nameStore';
import { useModal } from '@/hook/useLoading';
import { useStore } from '@/hook/useStore';
import API from '@/services/API';
import { INumberAndPerson } from '@/types/dataBaseType';
import { IPropsHome } from '@/types/home';
import { convertToMoney } from '@/utils/convertToMoney';
import { createIntegrityKey } from '@/utils/createIntegrity';
import { createReferences } from '@/utils/createReferences';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import styles from './chequeOut.module.scss';

export const ChequeOut = (props: IPropsHome) => {
	const [numbers, setNumbers] = useState<number>(0);
	const [numbersSelected, setNumbersSelected] = useState<number[]>();
	const [name, setName] = useState('');
	const [docId, setDocId] = useState('');
	const [email, setEmail] = useState('');
	const [tel, setTel] = useState('');
	const [dataRifa, setDataRifa] = useState<{
		precio: number;
		idSorteo: string;
	}>();
	const [signWompi, setSignWompi] = useState('');
	const [reference, setReference] = useState('');

	const handleChange =
		(setState: (param: string) => void) => (event: any) => {
			setState(event.target.value);
		};

	const { getStore, deleteStore } = useStore();
	const { setLoading } = useModal();
	const myFormRef = useRef<HTMLFormElement>(null);

	const router = useRouter();
	const signData = async (ref: string) => {
		const data = getStore(nameStore.DATA_RIFA, true);
		let nums = getStore(nameStore.NUMBERS, true);
		const numbers_selected = getStore(nameStore.NUMBERS_SELECTED, true);
		console.log(
			'💩 ~ file: chequeOut.tsx:45 ~ signData ~ numbers_selected:',
			numbers_selected,
		);

		if (numbers_selected !== null) {
			nums = numbers_selected.length;
			let parsedNumbers: number[] = (numbers_selected as string[]).map(
				num => Number(num),
			);
			setNumbersSelected(parsedNumbers);
		}

		setDataRifa(data);
		setNumbers(nums);
		const sign = await createIntegrityKey({
			Referencia: ref,
			Moneda: 'COP',
			Monto: (data?.precio ?? 0) * nums + '00',
			SecretoIntegridad:
				process.env.NEXT_PUBLIC_INTEGRITY_KEY_WOMPI ?? '',
		});

		setSignWompi(sign);
	};

	const validInput = (
		value: string,
		type: 'num' | 'string' | 'email',
		max: number,
		min: number,
	) => {
		if (value.length < min || value.length > max) {
			return (
				'Debe tener mínimo de ' +
				min +
				' y un máximo de ' +
				max +
				' caracteres'
			);
		}

		if (type === 'num' && !/^[/\d/]+$/.test(value)) {
			return 'Solo puede agregar números';
		}

		if (type === 'string' && !/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(value)) {
			return 'Solo puede agregar letras';
		}

		if (
			type === 'email' &&
			!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)
		) {
			return 'Debe agregar un correo electrónico valido';
		}

		return '';
	};

	const saveDataCliente = async () => {
		setLoading(true);
		const dataClient: INumberAndPerson = {
			client: {
				nombres: name,
				cedula: docId,
				celular: tel,
				email: email,
			},
			sorteo_id: Number(dataRifa?.idSorteo ?? '0'),
			numero_transaccion: reference,
			cantidad: numbers ?? 0,
			numbers: numbersSelected,
		};

		const Api = new API('/api');
		await Api.post<number[]>('saveNumberAndNumbers', dataClient)
			.then(result => {
				setTimeout(() => {
					handleSubmitForm();
					setLoading(false);
				}, 1000);
			})
			.catch(() => {
				return false;
			});
	};

	const handleSubmitForm = () => {
		myFormRef?.current?.submit();
	};

	const validForm = (): boolean => {
		return (
			validInput(name, 'string', 100, 10).length > 0 ||
			validInput(docId, 'num', 11, 5).length > 0 ||
			validInput(tel, 'num', 10, 10).length > 0 ||
			validInput(email, 'email', 100, 5).length > 0
		);
	};

	useEffect(() => {
		const newReference = createReferences();
		setReference(newReference);
		signData(newReference);
	}, []);

	return (
		<Layout
			logo={props.logo}
			facebook={props.facebook}
			instagram={props.instagram}>
			<div className={styles.chequeOut_header}>
				<GoBack></GoBack>
				<h1>Finalizar compra</h1>
			</div>
			<div className={styles.chequeOut_container}>
				<div className={styles.column}>
					<h2>Detalles de facturación</h2>
					<form>
						<div>
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
							{name.length > 0 && (
								<small>
									{validInput(name, 'string', 100, 10)}
								</small>
							)}
						</div>
						<div>
							<input
								type='tel'
								id='document'
								value={docId}
								maxLength={11}
								minLength={5}
								required
								placeholder='Cedula'
								onChange={event => {
									handleChange(setDocId)(event);
								}}
							/>
							{docId.length > 0 && (
								<small>{validInput(docId, 'num', 11, 5)}</small>
							)}
						</div>
						<div>
							<input
								type='number'
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
							{tel.length > 0 && (
								<small>{validInput(tel, 'num', 10, 10)}</small>
							)}
						</div>
						<div>
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
							{email.length > 0 && (
								<small>
									{validInput(email, 'email', 100, 5)}
								</small>
							)}
						</div>
					</form>
				</div>

				<div className={styles.column}>
					<div className={styles.cart}>
						<h2>Tu pedido</h2>
						<div className={styles.card_container}>
							<div className={styles.card_container_data}>
								<div className={styles.data}>
									<p>Nombre Actividad × {numbers}</p>
									<p>
										{convertToMoney(
											(dataRifa?.precio ?? 0) * numbers,
										)}
									</p>
								</div>
								<div className={styles.data}>
									<p>Subtotal</p>
									<p>
										{convertToMoney(
											(dataRifa?.precio ?? 0) * numbers,
										)}
									</p>
								</div>
								<div className={styles.data}>
									<p>Total</p>
									<p>
										{convertToMoney(
											(dataRifa?.precio ?? 0) * numbers,
										)}
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className={styles.chequeOut_footer}>
				<form
					action='https://checkout.wompi.co/p/'
					method='GET'
					ref={myFormRef}>
					<input
						type='hidden'
						name='public-key'
						value={process.env.NEXT_PUBLIC_PUB_KEY_WOMPI}
					/>
					<input type='hidden' name='currency' value='COP' />
					<input
						type='hidden'
						name='amount-in-cents'
						value={(dataRifa?.precio ?? 0) * numbers + '00'}
					/>
					<input type='hidden' name='reference' value={reference} />
					<input
						type='hidden'
						name='signature:integrity'
						value={signWompi}
					/>
					<input
						type='hidden'
						name='redirect-url'
						value={process.env.NEXT_PUBLIC_URL_WOMPI_REDIRECT}
					/>
					<div className={styles.container_buttons}>
						<Button
							type='Button'
							typeButton='button'
							label='Pagar con Wompi'
							onClick={event => {
								event.preventDefault();
								saveDataCliente();
							}}
							disable={validForm()}
						/>
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
				</form>
			</div>
		</Layout>
	);
};
