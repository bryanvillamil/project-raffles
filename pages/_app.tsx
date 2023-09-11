import type { AppProps } from 'next/app';
// import { ApolloProvider } from "@apollo/client";
// import client from "@client/index";
import Head from 'next/head';

export default function App({ Component, pageProps }: AppProps) {
	return (
		<>
			<Head>
				<meta
					name='viewport'
					content='width=device-width, initial-scale=1.0'
				/>
			</Head>

			{/* <ApolloProvider client={client}> */}
			<Component {...pageProps} />
			{/* </ApolloProvider> */}
		</>
	);
}
