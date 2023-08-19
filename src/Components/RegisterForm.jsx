import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import { useAuth } from '../context/authContext';
import "bootstrap/dist/css/bootstrap.min.css";
import {Button} from "reactstrap";
import '../Styles/LoginForm.css';
//import {app} from "../Firebase/conexion";

function RegisterForm(){
    const [user, setUser] = useState({
        email: "",
        password: "",
    });
    const {signup}= useAuth();
    const navigate = useNavigate();
    const [errorEmail,setErrorEmail] = useState();
    const [errorPassword,setErrorPassword] = useState();

    const handleChange = ({target: {id, value}}) =>
        setUser({...user,[id]: value})

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await signup(user.email, user.password);
            setErrorEmail("");
            setErrorPassword("");
            navigate('/mediciones');
        } catch (error) {
            console.log(error.code);
            if(user.email === ""){
                setErrorEmail("Debe registrar un email");
                setErrorPassword("");
            }
            else{
                if(error.code === "auth/missing-password"){
                    setErrorPassword("Debe registrar un password");
                    setErrorEmail("");
                }
                else{
                    if (error.code === "auth/invalid-email"){
                        setErrorEmail("Debe registrar un correo válido");
                        setErrorPassword(""); 
                    }
                    else if(error.code === "auth/email-already-in-use"){
                        setErrorEmail("El email ya se encuentra en uso");
                        setErrorPassword("");    
                    }
                    else if (error.code === "auth/weak-password"){
                        setErrorEmail();
                        setErrorPassword("Debe ingresar una password mayor o igual a 6 caracteres");
                    }
                    else {
                        setErrorPassword("Ha excedido el número de intentos, por favor espere 30 segundos");
                    }
                    
                }
            }
            
        }    



    };

    const showPassword = () =>{
        var a = document.getElementById("password");
        if(a.type === "password"){
            a.type = "text";
        }
        else a.type = "password";
    }

    return (
        <div className="formLogin">
            <header>
               <h4>REGISTRARSE</h4>
            </header>
            <form onSubmit={handleSubmit}>
                <div className="input-field">
                    <label htmlFor='email'><i className="bi bi-envelope-at-fill"></i>Email</label>
                    <input type="text" className="input" id="email" onChange={handleChange} autoComplete="off"/>
                    
                </div>
                {errorEmail && <p className='txtError'>{errorEmail}</p>}
                <div className="input-field">
                    <label htmlFor='password'><i className="bi bi-key-fill"></i>Password</label>
                    <div className='sectionPassword'>   
                        <i className="bi bi-eye-fill" onClick={showPassword}></i>
                        <input type="password" className="input" id="password"  onChange={handleChange}/>
                    </div>
                    
                </div>
                {errorPassword && <p className='txtError'>{errorPassword}</p>}
                <div className="input-field">
                    <Button color="success" type="submit" className="btnsubmit">Registrar</Button>
                </div>
            </form>
        </div>
    )
}
export default RegisterForm;