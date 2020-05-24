import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';

class Departments extends Component {
    state = {  }
    render() { 

        const departments = this.props.departments;
        const week = this.props.week;

        return ( 
            <Fragment>

                <table className="table col-md-6">
                    <thead>
                        <tr className="table-primary">
                            <th scope="col">Departamento</th>
                            <th scope="col">Gráfico</th>
                        </tr>
                    </thead>

                    <tbody>
                        {departments.map(item => {
                            const {id} = item;

                            return(
                                <tr key={id}>
                                    <td> {item.departmentName} </td>
                                    <td>
                                        <Link to={`/movilidad/grafica/semana/${week}/departamento/${item.id}`} className="btn btn-success font-weight-bold btn-block">Ver gráfica semanal</Link>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>

            </Fragment>
        );
    }
}
 
export default Departments;