//Creación de contexto del usuario para usarse en todos los componentes
import { createContext, useContext, useEffect, useState } from "react";
import {createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, sendPasswordResetEmail} from 'firebase/auth';
import {auth} from '../Firebase/conexion';

//Creación del contexto de autenticación
export const authContext = createContext();

//Hook personalizado que usa el contexto de autenticación
export const useAuth = () => {
    const context = useContext(authContext);
    if (!context) throw new Error("No hay un auth provider")
    return context;
};

//Componente AuthProvider que sirve como proveedor del contexto
export function AuthProvider({children}){
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);
    //Función para registrar un usuario mediante correo y contraseña
    const signup = async(email, password) => {
        await createUserWithEmailAndPassword(auth, email, password);
    }
    //Función para iniciar sesión
    const login = async(email, password) => {
        await signInWithEmailAndPassword(auth, email, password);
    }
    //Función para cerrar sesión
    const logout = () => signOut(auth) 

    const resetPassword = async(email) => {
        await sendPasswordResetEmail(auth,email);
    }

    //Mediante useEffect se toma los cambios de estado de autenticación
    useEffect(() => {
        //onAuthStateChanged escucha los cambios de estado de la autenticación
        const unSubscribe = onAuthStateChanged(auth, (currentUser) =>{
            setUser(currentUser);
            setLoading(false); 
        });
        return () => unSubscribe();
    },[])

    return (
        <authContext.Provider value={{signup, login, user, logout, loading, resetPassword}}>{children}</authContext.Provider>
    )
    
}
