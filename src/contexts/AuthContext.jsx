import { createContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';

const AuthContext = createContext();

const AuthProvider = ({children}) => {
    const [token,setToken] = useState(Cookies.get('token') || null)
    const [userName, setUserName] = useState(Cookies.get('userName') || null);

    const login = (newToken,name) => {
        Cookies.set('token',newToken,{expires: 7});
        Cookies.set('userName', name, { expires: 7 });
        setToken(newToken)
        setUserName(name);

    }
    const logout = () => {
        Cookies.remove('token')
        Cookies.remove('userName');
        setToken(null)
        setUserName(null);

    }

    useEffect(() => {
        const storedToken = Cookies.get('token');
        const storedUserName = Cookies.get('userName');
        
        if (storedToken) {
            setToken(storedToken);
        }
        if (storedUserName) {
            setUserName(storedUserName);
        }
    }, []);
    
    return (
        <AuthContext.Provider value={{ token, userName, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}


export {AuthContext,AuthProvider}