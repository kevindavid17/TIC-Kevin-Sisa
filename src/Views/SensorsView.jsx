import Tables from "../Components/Table";
import { Nav } from "../Components/Nav";

//import '../Styles/Nav.css';

function SensorsView(){

    return(
        <div className="container-sensorview">
            <div>
                <Nav></Nav>
            </div>
            <div className="container-table">
                <Tables></Tables>
            </div>
            
            
        </div>

    )
}
export default SensorsView;