import Graphics from "../Components/Graphic";
import {Nav} from "../Components/Nav";
function GraphicsView(){

    return(
        <div className="graphicsView">
            <div className="sectionNav">
                <Nav></Nav>
            </div>
            <div className="sectionGraphics">
                <Graphics></Graphics>
            </div>
        </div>
        

    )
}
export default GraphicsView;