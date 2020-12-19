import React, {useState, useEffect} from 'react';
import {userServices} from "../Services/userServices";

const UserContext = React.createContext();

export function UserProvider(props) {
    const [user, setUser] = useState(null);
    const [loadingUser, setLoadingUser] = useState(true)
    useEffect(() => {
        const ac = new AbortController();
        getUser();
        return () => ac.abort();
    }, []);

    async function getUser() {
        const res = await userServices.authMe();
        if (res.status === 200) {
            setUser(res.data);
            setLoadingUser(false);
        }
    }

    async function logout() {
        await userServices.logout();
        setUser(null);
        setLoadingUser(false)
        return window.location.href = "/login";
    }

    async function login(data) {
        const res = await userServices.login(data);
        if (res.status === 200) {
            setLoadingUser(true);
            await getUser();
            return true;
        } else {
            return res.data.message;
        }
    }

    async function register(data) {
        const res = await userServices.postUser(data);
        if (res.status === 200) {
            setLoadingUser(true)
            await getUser();
            return true
        } else {
            return res.data;
        }
    }

    const value = React.useMemo(() => {
        return {
            user,
            logout,
            login,
            register,
            getUser,
            loadingUser
        };
        // eslint-disable-next-line
    }, [user, loadingUser]);
    return <UserContext.Provider value={value} {...props} />;
}

export function useUser() {
    const context = React.useContext(UserContext);
    if (!context) {
        throw new Error("useUsuario debe estar dentro del proveedor UserContext");
    }
    return context;
}