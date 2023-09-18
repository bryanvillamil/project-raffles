import React, { createContext, useContext, useState, ReactNode } from 'react';

interface ModalContextType {
	// showModal: boolean;
	toggleModal: () => void;
	loading: boolean;
	setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

interface ModalProviderProps {
	children: ReactNode;
}

export const ModalProvider: React.FC<ModalProviderProps> = ({ children }) => {
	// const [showModal, setShowModal] = useState(false);
	const [loading, setLoading] = useState(false);

	const toggleModal = () => setLoading(prev => !prev);

	const value = {
		toggleModal,
		loading,
		setLoading,
	};

	return (
		<ModalContext.Provider value={value}>{children}</ModalContext.Provider>
	);
};

export const useModal = () => {
	const context = useContext(ModalContext);
	if (!context) {
		throw new Error(
			'useModal debe ser utilizado dentro de un ModalProvider',
		);
	}
	return context;
};
