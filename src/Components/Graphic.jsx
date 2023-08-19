import { Area, Tooltip, CartesianGrid, ResponsiveContainer, XAxis, YAxis, AreaChart } from "recharts";
import {db} from "../Firebase/conexion";
import { useEffect, useState} from 'react';
import '../Styles/GraphicsView.css';


function Graphics(){
    const [data1, setData1] = useState([]);
    
    //Función para obtener datos en consulta de Cloud Firestore
    const getDataForGraphic = () =>{
        //Realiza consulta a Cloud Firestore de Fecha y Hora de registro descendente
        const query = db.collection('Sensores').orderBy('fecha','asc').orderBy('hora','asc');
        try {
            //Observador en la consulta para recibir datos
            query.onSnapshot((querySnapshot) =>{
                const docs = [];
                querySnapshot.forEach(doc => {
                    //Agregar cada documento al arreglo
                    docs.push({...doc.data(), id:doc.id});
                });
                setData1(docs); //Actualizar el estado de data con datos del arreglo
            });
        } catch (error){
            console.log("Error al obtener los datos:", error);
        } 
    };
    
    useEffect(() =>{
        getDataForGraphic();
    }, []);


    return(
        <div className="graphics">
            <div className="graphicNO2">
                <div className="title">
                    <h3>GRÁFICA DIÓXIDO DE NITRÓGENO (NO2)</h3>
                </div>      
                <ResponsiveContainer width="90%" aspect={4}>
                    <AreaChart data={data1} width="500" height="300" margin={{top:10, right:60, left:0, bottom: 0}}>
                        <CartesianGrid strokeDasharray="3 8 3" stroke="grey"/>
                        <XAxis dataKey="fecha"/>
                        <YAxis/>
                        <Tooltip/>
                        <Area type={"monotone"} dataKey="no2" name="NO2 [ppb]" stackId="1" stroke="#00bfff" fill="#72C8F1"/>
                        <Area type={"monotone"} dataKey="hora" name ="Hora" stackId="1" stroke="#1414B8"/>
                        <Area type={"monotone"} dataKey="dia" name ="Día" stackId="1" stroke="#7d2181"/>
                    </AreaChart>
                </ResponsiveContainer>
            </div>

            <div className="graphicOzono">
                <div className="title">
                    <h3>GRÁFICA OZONO (O3)</h3>
                </div>      
                <ResponsiveContainer width="90%" aspect={4}>
                    <AreaChart data={data1} width="500" height="300" margin={{top:10, right:60, left:0, bottom: 0}}>
                        <CartesianGrid strokeDasharray="3 8 3" stroke="grey"/>
                        <XAxis dataKey="fecha"/>
                        <YAxis/>
                        <Tooltip/>
                        <Area type={"monotone"} dataKey="ozono" name="Ozono [ppb]" stackId="1" stroke="#00a135" fill="#11FB40"/>
                        <Area type={"monotone"} dataKey="hora" name="Hora" stackId="1" stroke="#1414B8"/>
                        <Area type={"monotone"} dataKey="dia" name ="Día" stackId="1" stroke="#7d2181"/>
                    </AreaChart>
                </ResponsiveContainer>

            </div>

            <div className="graphicTemperatura">
                <div className="title">
                    <h3>GRÁFICA TEMPERATURA</h3>
                </div>      
                <ResponsiveContainer width="90%" aspect={4}>
                    <AreaChart data={data1} width="500" height="300" margin={{top:10, right:60, left:0, bottom: 0}}>
                        <CartesianGrid strokeDasharray="3 8 3" stroke="grey"/>
                        <XAxis dataKey="fecha"/>
                        <YAxis/>
                        <Tooltip/>
                        <Area type={"monotone"} dataKey="temperatura" name="Temperatura [°C]" stackId="1" stroke="#e68019" fill="orange"/>
                        <Area type={"monotone"} dataKey="hora" name ="Hora" stackId="1" stroke="#1414B8"/>
                        <Area type={"monotone"} dataKey="dia" name ="Día" stackId="1" stroke="#7d2181"/>
                    </AreaChart>
                </ResponsiveContainer>
            
            </div>     

            
        </div>
    )
}
export default Graphics;