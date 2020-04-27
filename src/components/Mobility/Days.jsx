import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';

class Days extends Component {
    state = {  }
    render() { 

        const {day} = this.props;
        const week = this.props.week;

        return ( 
            <Fragment>
                <div className="col-md-4">
                    <div className={`card mb-3`}>
                        <div className="card-body">
                        <p className="card-text font-weight-bold">ID Día:
                                <span className="font-weight-normal"> {day.id} </span>
                            </p>
                            <p className="card-text font-weight-bold">Número del día:
                                <span className="font-weight-normal"> {day.dayNumber} </span>
                            </p>
                            <p className="card-text font-weight-bold">Nombre del día:
                                <span className="font-weight-normal"> {day.dayName} </span>
                            </p>
                            <Link to={`/movilidad/semana/${week}/dia/${day.id}`} className="btn btn-success font-weight-bold btn-block">
                                Abrir registro diario
                            </Link>
                        </div>
                    </div>
                </div>
            </Fragment>
        );
    }
}
 
export default Days;