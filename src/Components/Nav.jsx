import {useAuth} from "../context/authContext"; 
//import { Button } from "reactstrap";
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../Styles/Nav.css';
import { useState } from "react";

export function Nav(){
    const {user,logout, loading} = useAuth();
    

    const [clickMenu, setClickMenu] =useState(true);
    const handleClickMenu = () =>{
        setClickMenu(!clickMenu);
    }
    const handleLogout = async () => {
        await logout();
        
    };

    if (loading) return <h1>loading</h1>
    return(
        <div className="container-nav">            
            <nav className="navbar fixed-top">
                <div className="logoNav">
                    <div className="logo"></div>
                </div>
                
                <div className="menu-links" onClick={handleClickMenu}>
                    <i className={clickMenu ? "bi bi-list": "bi bi-x-lg" }></i>
                </div>
                <ul className={clickMenu ? "nav-links" : "nav-links active"}>
                    <li><p className="user-text"> <i className="bi bi-person-circle"></i> {user.email}</p></li>
                    <li><a className="linkItem" href="/mediciones"><i className="bi bi-house-door-fill"></i>Principal</a></li>
                    <li><a className="linkItem" href="/contactos"><i className="bi bi-telephone-fill"></i>Contactos</a></li>
                    <li><a className="linkItem" href="/login" onClick={handleLogout}><i className="bi bi-box-arrow-right"></i>Salir</a></li>
                </ul>
                
            </nav>
            
        </div>
        
    )
}