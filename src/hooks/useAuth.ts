import { useAuthContext } from '../context/AuthContext';

const useAuth = () => {
  const context = useAuthContext();
  return context;
};

export default useAuth;