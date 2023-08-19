import {Nav} from "../Components/Nav";
import kevinsisa from "../Images/kevinsisa.jpg";
import fabiogonzalez from "../Images/fabiogonzalez.jpg";
import "../Styles/Contactos.css";
function ContactosView(){

    return(
        <div className="contactosView">
            <div className="sectionNav">
                <Nav></Nav>
            </div>
            <div className="sectionContacts">
                <div className="container">
                    <div className="row">
                       
                        <div className="col-md-6 mb-md-0 mb-3">
                            <div className="card">
                                <div className="inner-content">
                                    <div className="img-container rounded-circle">
                                        <img src={fabiogonzalez} alt="Fotografía Fabio Gonzalez" className="rounded-circle"/>
                                    </div>
                                    <h3>Fabio Gonzalez</h3>
                                    <p className="designation text-muted">TUTOR DE TIC</p>
                                </div>
                                <ul className="social-links list-unstyled w-100 fs-5 m-0 p-0">
                                    <li><a href="mailto:fabio.gonzalez@epn.edu.ec" target="_blank" rel="noreferrer"><i className="bi bi-envelope-at-fill"></i></a></li>
                                    <li><a href="https://www.linkedin.com/in/fabio-gonzalez-54324197" target="_blank" rel="noreferrer"><i className="bi bi-linkedin"></i></a></li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-md-6 mb-md-0 mb-3">
                            <div className="card">
                                <div className="inner-content">
                                    <div className="img-container rounded-circle">
                                        <img src={kevinsisa} alt="Fotografía Kevin Sisa" className="rounded-circle"/>
                                    </div>
                                    <h3>Kevin Sisa</h3>
                                        <p className="designation text-muted">DESARROLLADOR TIC</p>
                                </div>
                                <ul className="social-links list-unstyled w-100 fs-5 m-0 p-0">
                                    <li><a href="https://twitter.com/Kevdeiv99?t=zP9CZp1weAhxJLmEVVXwTg&s=09" target="_blank" rel="noreferrer"><i className="bi bi-twitter"></i></a></li>
                                    <li><a href="mailto:kevin.sisa@epn.edu.ec" target="_blank" rel="noreferrer"><i className="bi bi-envelope-at-fill"></i></a></li>
                                    <li><a href="https://www.linkedin.com/in/kevin-sisa-703a7a228" target="_blank" rel="noreferrer"><i className="bi bi-linkedin"></i></a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            
            </div>
        </div>
        

    )
}
export default ContactosView;