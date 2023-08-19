//import {Button} from "reactstrap";
import LoginForm from "../Components/LoginForm";
import { useAuth } from "../context/authContext";
import { Navigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import '../Styles/LoginRegisterView.css';


function LoginView(){
    const {user} = useAuth();
    if (user) {
        return <Navigate to="/principal" />;
      }
    return(
        <div className="Container">
            <div className="Container main">
                <div className="row">
                    <div className="col-md-6 side-image">
                        
                        {/*<div className="text">
                            <p>Ingresar</p>
                        </div>*/}
                    </div>
                    <div className="col-md-6 right">
                        <LoginForm></LoginForm>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default LoginView;