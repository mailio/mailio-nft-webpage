import { useContext } from 'react';
import { AuthContext, AuthContextValue } from '../contexts/auth-context';

export const useAuth = (): AuthContextValue => useContext(AuthContext);