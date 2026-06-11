import { createContext, useCallback, useContext, useState } from 'react';
import type {BalanceResponse}  from '../models/models';

interface ProductContextType {
	balance: BalanceResponse | null;
	saveBalance: (balance: BalanceResponse) => void;
	clearBalance: () => void;
}

const ProductContext = createContext<ProductContextType | null>(null);

const readStoredBalance = (): BalanceResponse | null => {
	const saved = localStorage.getItem('bancoxyz_balance');
	if (!saved || saved === 'undefined') {
		localStorage.removeItem('bancoxyz_balance');
		return null;
	}

	try {
		return JSON.parse(saved) as BalanceResponse;
	} catch {
		localStorage.removeItem('bancoxyz_balance');
		return null;
	}
};

export const ProductProvider = ({ children }: { children: React.ReactNode }) => {
	const [balance, setBalance] = useState<BalanceResponse | null>(() => {
		return readStoredBalance();
	});

	const saveBalance = useCallback((nextBalance: BalanceResponse) => {
		if (!nextBalance) {
			setBalance(null);
			localStorage.removeItem('bancoxyz_balance');
			return;
		}

		setBalance(nextBalance);
		localStorage.setItem('bancoxyz_balance', JSON.stringify(nextBalance));
	}, []);

	const clearBalance = useCallback(() => {
		setBalance(null);
		localStorage.removeItem('bancoxyz_balance');
	}, []);

	return (
		<ProductContext.Provider value={{ balance, saveBalance, clearBalance }}>
			{children}
		</ProductContext.Provider>
	);
};

export const useProductContext = () => {
	const context = useContext(ProductContext);
	if (!context) throw new Error('useProductContext must be used within ProductProvider');
	return context;
};
