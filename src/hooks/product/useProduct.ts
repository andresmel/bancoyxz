import { useCallback, useState } from "react";
import { productService } from "../../services/product/service-product";
import { useProductContext } from "../../context/ProductContext";

export const useProduct = () => {
        const [loading, setLoading] = useState(false);
        const [error, setError] = useState<string | null>(null);
        const { balance, saveBalance } = useProductContext();

    const getBalance = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
             const balance = await productService.getBalance();
             saveBalance(balance);
        } catch (err: any) {
            const message = err.response?.data?.message || "Failed to fetch balance";
            setError(message);
        } finally {
            setLoading(false);
        }

    }, [saveBalance]);

    return { loading, error, balance, getBalance };

};