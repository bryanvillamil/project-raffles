import { ChequeOut } from '@/components/pages/chequeOut/chequeOut';
import { getDataHome } from '@/services/home';
import { IPropsHome } from '@/types/home';
import { GetStaticProps } from 'next';

const index = (props: IPropsHome) => {
	return <ChequeOut {...props} />;
};
export default index;

export const getStaticProps: GetStaticProps<any> = async () => {
	const data = await getDataHome();
	return {
		props: {
			...data,
		},
	};
};
