import RegisterForm from "../Components/RegisterForm";
import { useAuth } from "../context/authContext";
import { Navigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import '../Styles/LoginRegisterView.css';

function RegisterView(){
    const {user} = useAuth();
    if (user) {
        return <Navigate to="/principal" />;
    }

    return(
        <div className="Container">
            <div className="Ccntainer main">
                <div className="row">
                    <div className="col-md-6 side-image">
                        
                        {/*<div className="text">
                            <p>Ingresar</p>
                        </div>*/}
                    </div>
                    <div className="col-md-6 right">
                        <RegisterForm></RegisterForm>
                       
                    </div>
                </div>
            </div>
        </div>
    )
}
export default RegisterView;