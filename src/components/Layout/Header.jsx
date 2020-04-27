import React from 'react'
import { Link } from 'react-router-dom';

const Header = () => {
    return ( 
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary justify-content-between d-flex mb-5">
        <div className="container">
            <Link to="/" className="navbar-brand text-light font-weight-bold">
                PlasticApp
            </Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navegacion" aria-controls="navegacion" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navegacion">
                <ul className="navbar-nav ml-auto text-right">
                    <li className="nav-item dropdown mr-md-3 mb-2 mb-md-0">
                        <button
                            className="nav-link dropdown-toggle btn btn-block btn-success"
                            data-toggle="dropdown"
                        >Recursos Humanos</button>
                        <div className="dropdown-menu" aria-labelledby="navegacion">
                            <Link to="/departamentos" className="dropdown-item">
                                Consultar Departamentos
                            </Link>
                            <Link to="/puestos" className="dropdown-item">
                                Consultar Puestos
                            </Link>
                            <Link to="/empleados" className="dropdown-item">
                                Consultar Empleados
                            </Link>
                        </div>
                    </li>

                    <li className="nav-item dropdown mr-md-3 mb-2 mb-md-0">
                        <button
                            className="nav-link dropdown-toggle btn btn-block btn-secondary"
                            data-toggle="dropdown"
                        >Producción</button>
                        <div className="dropdown-menu" aria-labelledby="navegacion">
                            <Link to="/bloques/nuevo" className="dropdown-item">
                                Crear Nuevo Bloque
                            </Link>
                            <Link to="/maquinas/nuevo" className="dropdown-item">
                                Crear Nueva Máquina
                            </Link>
                            <Link to="/productos/nuevo" className="dropdown-item">
                                Crear Nuevo Producto
                            </Link>
                        </div>
                    </li>

                    <li className="nav-item dropdown mr-md-3 mb-2 mb-md-0">
                        <button
                            className="nav-link dropdown-toggle btn btn-block btn-warning"
                            data-toggle="dropdown"
                        >Movilidad</button>
                        <div className="dropdown-menu" aria-labelledby="navegacion">
                            <Link to="/movilidad" className="dropdown-item">
                                Consultar Informes
                            </Link>
                            <Link to="/movilidad/departamentos" className="dropdown-item">
                                Consultar Bloques
                            </Link>
                            <Link to="/movilidad/operadores" className="dropdown-item">
                                Consultar Operadores
                            </Link>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
     );
}
 
export default Header;