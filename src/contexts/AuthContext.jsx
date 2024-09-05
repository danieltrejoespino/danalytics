import { createContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';

const AuthContext = createContext();

const AuthProvider = ({children}) => {
    const [token,setToken] = useState(Cookies.get('token') || null)

    const login = (newToken) => {
        Cookies.set('token',newToken,{expires: 7});
        setToken(newToken)
    }
    const logout = () => {
        Cookies.remove('token')
        setToken(null)
    }

    useEffect(() => {
        const storedToken = Cookies.get('token');
        if (storedToken) {
            setToken(storedToken);
        }
    }, []);
    
    return (
        <AuthContext.Provider value={{ token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}


export {AuthContext,AuthProvider}