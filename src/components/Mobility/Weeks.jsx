import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';

class Weeks extends Component {
    state = {  }
    render() { 

        const {week} = this.props;
        const month = this.props.month;

        return ( 
            <Fragment>

                <div className="col-md-4">
                    <div className={`card mb-3`}>
                        <div className="card-body">
                        <p className="card-text font-weight-bold">ID Semana:
                                <span className="font-weight-normal"> {week.id} </span>
                            </p>
                            <p className="card-text font-weight-bold">Número de semana:
                                <span className="font-weight-normal"> {week.week} </span>
                            </p>
                            <Link to={`/movilidad/mes/${month}/semana/${week.id}`} className="btn btn-info font-weight-bold btn-block">
                                Abrir registro semanal
                            </Link>
                        </div>
                    </div>
                </div>

            </Fragment>
        );
    }
}
 
export default Weeks;