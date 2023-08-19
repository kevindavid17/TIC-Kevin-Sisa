import {useState, useRef} from 'react';
import { useAuth } from '../context/authContext';
import {useNavigate} from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import {Button} from "reactstrap";
import '../Styles/LoginForm.css';

function LoginForm(){
    const [user, setUser] = useState({
        email: "",
        password: "",
    });
    const {login, resetPassword}= useAuth();
    const navigate = useNavigate();
    const [errorEmail,setErrorEmail] = useState();
    const [errorPassword,setErrorPassword] = useState();
    const [errorResetPassword,setErrorResetPassword] = useState();
    const emailRef = useRef();

    const handleResetPassword = async (e) =>{
        e.preventDefault();
        try{
            setErrorResetPassword("");
            await resetPassword(emailRef.current.value)
            setErrorResetPassword("¡Envío exitoso! Por favor, revise su correo");
        } catch{
        setErrorResetPassword("El correo ingresado no está registrado");
        }
    }


    const handleChange = ({target: {id, value}}) =>
    setUser({...user,[id]: value})

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(user.email, user.password);
            setErrorEmail("");
            setErrorPassword("");
            navigate('/mediciones');
        } catch (error) {
            //console.log(error.code);
           
            if(user.email === ""){
                setErrorEmail("Primero debe ingresar el email");
                setErrorPassword("");
            }
            else{
                if(error.code === "auth/invalid-email"){
                    setErrorEmail("Debe ingresar un email válido");
                    setErrorPassword("");
                }
                else{
                    if (error.code === "auth/missing-password"){
                        setErrorPassword("Debe ingresar una password");
                        setErrorEmail("");
                        
                    }
                    else if(error.code === "auth/wrong-password"){
                        setErrorEmail("");
                        setErrorPassword("Password incorrecta");
                    }
                    else if(error.code === "auth/user-not-found"){
                        setErrorEmail("El email no esta registrado");
                        setErrorPassword("");    
                    }
                    else {
                        setErrorPassword("Ha excedido el número de intentos, por favor espere 30 segundos");
                    }
                    
                }
            }
            
        } 
        

    };

    const handleClick = () => {
        navigate('/registro');
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
                <h4>INICIA SESIÓN</h4>
            </header>
            <form onSubmit={handleSubmit}>
                <div className='input-field'>
                    <label htmlFor='email'><i className="bi bi-envelope-at-fill"></i>Email</label>
                    <div className="sectionEmail">
                        
                        <input type="text" className="input" id="email" onChange={handleChange} autoComplete="off"/>
                    </div>
                </div>
                {errorEmail && <p className='txtError'>{errorEmail}</p>}
                <div className="input-field">
                    <label htmlFor='password'><i className="bi bi-key-fill"></i>Password</label>
                    <div className='sectionPassword'>
                        <i className="bi bi-eye-fill" onClick={showPassword}></i>
                        <input type="password" className="input" id="password" onChange={handleChange}/>
                    </div>                
                </div>
                {errorPassword && <p className='txtError'>{errorPassword}</p>}
                <div className="input-field">
                    <Button color="success" type="submit" className="btnsubmit">Iniciar sesión</Button>
                </div>
            </form>
            <div className="forgotPassword">
                <Button color="primary" className="btnResetPassword" data-bs-toggle="modal" data-bs-target="#exampleModalCenter">¿Olvidaste tu contraseña?</Button>
            </div>
            <div className="modalPassword">
                <div className="modal fade" id="exampleModalCenter" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true" data-bs-backdrop="static">
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div  style={{ backgroundColor: '#192E5B'}} className="modal-content">
                            <div className="modal-header">  
                                <h5 className="modal-title" id="exampleModalLongTitle">Ingrese el correo electrónico</h5>
                                <Button className='btn btn-secondary' data-bs-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </Button>
                            </div>
                            <div className="modal-body">
                                <input type="text" className="inputResetPassword" id="resetPassword" ref={emailRef} autoComplete="off"/>
                                {errorResetPassword && <p>{errorResetPassword}</p>}
                            </div>
                            <div className="modal-footer">
                                <Button type="button" className="btnsubmit" onClick={handleResetPassword}>Enviar</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="signin">
                <Button color="primary" className="btnNuevaCuenta" onClick={handleClick} >Crear nueva cuenta</Button>
            </div>
        </div>
    )
}
export default LoginForm;