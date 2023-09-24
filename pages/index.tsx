import Home from '@/components/pages/home/home';
import type { GetStaticProps } from 'next';
import { getDataHome } from '@services/home';

export default function Index(props: {
	homeRifas: { marca: string; precio: number; idSorteo: string };
}) {
	console.log('props', props);
	return <Home {...props} />;
}

export const getStaticProps: GetStaticProps<any> = async () => {
	const data = await getDataHome();
	return {
		props: {
			...data,
		},
	};
};
