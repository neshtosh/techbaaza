import { useCart as useCartContext } from '../context/CartContext';

export const useCart = (): ReturnType<typeof useCartContext> => {
  const context = useCartContext();
  return context;
};