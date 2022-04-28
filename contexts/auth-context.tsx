/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, FC, ReactNode, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { AUTH_TOKEN, User, UserCredentials } from '../types/user';
import API from '../api/api';
import { AuthenticationError } from '../types/auth-error';

export interface AuthContextValue {
    isAuthenticated: boolean;
    isInitialized: boolean;
    user: User | undefined;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
}

export const AuthContext = createContext<AuthContextValue>({
    isAuthenticated: false,
    isInitialized: false,
    user: undefined,
    login: () => Promise.resolve(),
    logout: () => { }
});

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: FC<AuthProviderProps> = (props) => {
    const { children } = props;

    const [user, setUser] = useState<User | undefined>(undefined);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [isInitialized, setIsInitialized] = useState<boolean>(false);

    // on page load check if there is JWT token
    useEffect(() => {
        const token = localStorage.getItem(AUTH_TOKEN);

        if (token) {
            setIsAuthenticated(true);
        } else {
            setIsAuthenticated(false);
        }
        setIsInitialized(true);
    }, []);

    const login = async (email: string, password: string) => {
        try {
            const userLogin = await API.post<UserCredentials>('/v1/login', { email, password });
            const token = userLogin.data.token;
            setUser({
                email: email,
            });
            setIsAuthenticated(true);
            localStorage.setItem(AUTH_TOKEN, token);
        } catch (error: any) {
            setIsAuthenticated(false);
            setUser(undefined);
            throw new AuthenticationError("Authentication failed");
        }
    };

    const logout = () => {
        localStorage.removeItem(AUTH_TOKEN);
        setIsAuthenticated(false);
        setUser(undefined);
    };


    return (
        <AuthContext.Provider
            value={{
                user,
                isAuthenticated,
                isInitialized,
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
};

export const AuthConsumer = AuthContext.Consumer;

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired
};
