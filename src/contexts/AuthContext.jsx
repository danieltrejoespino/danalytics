import { createContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';

const AuthContext = createContext();

const AuthProvider = ({children}) => {
    const [token,setToken] = useState(Cookies.get('token') || null)
    const [userName, setUserName] = useState(Cookies.get('userName') || null);
    const [userId, setUserId] = useState(Cookies.get('userId') || null);

    const login = (newToken,idUser,name) => {
        Cookies.set('token',newToken,{expires: 7});
        Cookies.set('userId', idUser, { expires: 7 });
        Cookies.set('userName', name, { expires: 7 });
        setToken(newToken)
        setUserId(userId);
        setUserName(name);

    }
    const logout = () => {
        Cookies.remove('token')
        Cookies.remove('userId');
        Cookies.remove('userName');
        setToken(null)
        setUserId(null);
        setUserName(null);

    }

    useEffect(() => {
        const storedToken = Cookies.get('token');
        const storedUserId = Cookies.get('userId');
        const storedUserName = Cookies.get('userName');
        
        if (storedToken) {
            setToken(storedToken);
        }
        if (storedUserId) {
            setUserId(storedUserId);
        } 
               if (storedUserName) {
            setUserName(storedUserName);
        }
    }, []);
    
    return (
        <AuthContext.Provider value={{ token,userId, userName, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}


export {AuthContext,AuthProvider}