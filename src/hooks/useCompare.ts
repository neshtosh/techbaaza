import { useCompareContext } from '../context/CompareContext';

export const useCompare = () => {
  const context = useCompareContext();
  return context;
};