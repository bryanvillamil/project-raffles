const randomKey = (prefix: string = 'key') => {
	return (
		prefix +
		'-' +
		Date.now() +
		'-' +
		Math.random().toString(36).substring(2)
	);
};
export default randomKey;
