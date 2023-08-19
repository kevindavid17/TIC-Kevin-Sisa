//import { read, writeFileXLSX } from "xlsx";
import * as XLSX from "xlsx";
import {db} from "../Firebase/conexion";
import {useEffect, useState} from 'react';
import { Link } from "react-router-dom";
import {Button} from 'react-bootstrap';
import ReactDatePicker from "react-datepicker";
import DataTable from 'react-data-table-component';
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/js/bootstrap.bundle.min';
import "react-datepicker/dist/react-datepicker.css";
import es from "date-fns/locale/es";
import "../Styles/Table.css";


function Tables(){

    const [data, setData] = useState([]);
    const [search, setSearch] = useState("");
    const [dateIn, setDateIni ] = useState("");
    const [dateFin, setDateFin ] = useState("");
    const [isDownloading, setIsDownloading] = useState(false);

    const columns = [
        { name: 'NO2 [ppb]', selector: row=>row.no2},
        { name: 'Ozono [ppb]', selector: row=>row.ozono},
        { name: 'Temperatura [°C]', selector: row=>row.temperatura},
        { name: 'Fecha', selector: row=>row.fecha},
        { name: 'Hora', selector: row=>row.hora},
        { name: 'Día', selector: row=>row.dia },        
    ];

    //Función para obtener datos de Cloud Firestore
    const getDataForTable = () =>{
        //Realización de consulta a Cloud Firestore de fechas y horas de registro en orden descendente
        const query = db.collection('Sensores').orderBy('fecha','desc').orderBy('hora','desc');
        try{
            //observador en la consulta para recibir datos a tiempo real
            query.onSnapshot((querySnapshot) =>{
                const docs = [];
                querySnapshot.forEach(doc => {
                    //Agregar cada documento al arreglo llamado docs
                    docs.push({...doc.data(), id:doc.id});
                });
                setData(docs); //Actualiza el estado de data con el arreglo docs
            });    
        } catch(error){
            console.log("Error al obtener los datos: ", error);
        }

    };

    const handleFilter = (search) =>{
        return function(a){
            return a.fecha.includes(search) || !search;
        };

    }

    const searchFiltered = data.filter(handleFilter(search));

    const handleSelectedDateI = (date) =>{
        setDateIni(date);
        // Si hay una fecha de fin seleccionada y es anterior a la nueva fecha de inicio, establecerla en null
        if (dateFin && date > dateFin) {
          setDateFin(null);
        }
    };

    const handleSelectedDateF = (date) => {
        // Si la fecha de fin es anterior a la fecha de inicio, no realizar ningún cambio
        if (dateIn && date < dateIn) {
          return;
        }
        setDateFin(date);
    };

    const handleExcel = () =>{
        if (isDownloading) {
            return;
        }
    
        setIsDownloading(true);

        //Variables de fechas seleccionadas por el usuario desde el calendario
        var dateI = document.getElementById("datePickerI").value;
        var dateF = document.getElementById("datePickerF").value;
        //Realización de consulta a Cloud Firestore en un intervalo de fechas definido por el usuario de forma descendente
        const query1 = db.collection('Sensores').where('fecha','>=',dateI).where('fecha','<=',dateF).orderBy('fecha','desc').orderBy('hora','desc');
        try{
            //observador en la consulta para recibir datos a tiempo real
            query1.onSnapshot((querySnapshot) =>{
                const docs1 = [];
                querySnapshot.forEach(doc => {
                    docs1.push({...doc.data(), id:doc.id}); //Agregar cada documento al arreglo llamado docs1
                });
                const filter = docs1.map(row=>{
                    row.no2 = Number(row.no2);
                    row.ozono = Number(row.ozono);
                    row.temperatura = Number(row.temperatura);
                    delete row.id; //elimina la propiedad id de cada objeto del arreglo
                    return {
                        //retorna las propiedades en un orden específico
                        "NO2 [ppb]": row.no2,
                        "Ozono [ppb]": row.ozono,
                        "Temperatura [°C]": row.temperatura,
                        "Fecha": row.fecha,
                        "Hora": row.hora,
                        "Día": row.dia,
                    };
                })
                const columnWidths = [
                    { wch: 18 },   // Ancho para la columna "NO2 [ppb]"
                    { wch: 18 },   // Ancho para la columna "Ozono [ppb]"
                    { wch: 18 },   // Ancho para la columna "Temperatura [°C]"
                    { wch: 18 },   // Ancho para la columna "Fecha"
                    { wch: 18 },   // Ancho para la columna "Día"
                    { wch: 18 }    // Ancho para la columna "Hora"
                ];
            
                const libro = XLSX.utils.book_new(); //Creación del libro Excel y la hoja con su respectivo nombre 
                const hoja = XLSX.utils.json_to_sheet(filter);
                
                hoja['!cols'] = columnWidths;

                XLSX.utils.book_append_sheet(libro, hoja, "Mediciones de sensores");
                //Espera de 1 segundo y luego guarda el libro en un Excel
                setTimeout(() =>{
                    XLSX.writeFile(libro, "Datos de medición de "+ dateI + " a " + dateF +".xlsx");
                    setIsDownloading(false);
                }, 1000)
            });         
        } catch(error){
            console.log("Error al obtener datos de Firebase: ",error);
        }
         
    }

    useEffect(() =>{
        getDataForTable();
    }, []);
    

    return(
        <div className="compTable">
            <div className="titleTable">
                <h3>TABLA DE DATOS DEL MÓDULO SENSOR</h3>
            </div>
            <div className="containerTable">
                
                <div className="input-group">
                    <div className="sectionSearch">
                        <h4>Buscador:</h4>
                        <div className="form-outline">
                            <input type="search" id="form1" className="form-control" placeholder="Por fecha aa/mm/dd" name="search"  onChange={e =>{setSearch(e.target.value)}}/>
                        </div>
                    </div>
                    <div className="sectionButtons">
                        <Link to="/mediciones/graficas">
                            <Button className="btnGraphic">Visualizar gráficas</Button>
                        </Link>
                        <Button className="btnExport" data-bs-toggle="modal" data-bs-target="#exampleModalCenter">
                            Exportar datos
                        </Button>
                    </div>
                    
                    <div className="modal fade" id="exampleModalCenter" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true" data-bs-backdrop="static">
                        <div className="modal-dialog modal-dialog-centered" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="exampleModalLongTitle">Exportar datos</h5>
                                    <Button className="btn btn-secondary" data-bs-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </Button>
                                </div>
                                <div className="modal-body">
                                    <p>Seleccione la fecha de inicio:</p>
                                    <ReactDatePicker selected={dateIn} onChange={handleSelectedDateI} locale={es} dateFormat={"yyyy/MM/dd"} className="datePickerI" value={dateIn} id="datePickerI" autoComplete="off"/>
                                    <p>Seleccione la fecha de fin:</p>
                                    <ReactDatePicker selected={dateFin} onChange={handleSelectedDateF} locale={es} dateFormat={"yyyy/MM/dd"} className="datePickerI" value={dateFin} id="datePickerF" autoComplete="off" minDate={dateIn}  disabled={!dateIn}/>
                                </div>
                                
                                <div className="modal-footer">
                                    <Button className="btn btn-success" onClick={handleExcel}>Descargar Excel</Button>
                                </div>
                            </div>
                        </div>
                    </div>        
                </div>
            
                <div className="table-responsive-lg">
                    <DataTable  
                    columns={columns} 
                    data={searchFiltered}
                    fixedHeader
                    pagination>
                    </DataTable>
                                     
                </div>
           
            </div>
         
           
        </div>

    )
}
export default Tables;