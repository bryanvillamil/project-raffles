import type { AppProps } from 'next/app';
// import { ApolloProvider } from "@apollo/client";
// import client from "@client/index";
import Head from 'next/head';
import '@styles/reset.css';
import { ModalProvider } from '@/hook/useLoading';

export default function App({ Component, pageProps }: AppProps) {
	return (
		<ModalProvider>
			<Head>
				<meta
					name='viewport'
					content='width=device-width, initial-scale=1.0'
				/>
			</Head>

			{/* <ApolloProvider client={client}> */}
			<Component {...pageProps} />
			{/* </ApolloProvider> */}
		</ModalProvider>
	);
}
