import React, { Component, Fragment } from 'react';

//Styles
import '../../styles.css';

class MobilityTable extends Component {
    state = {  }
    render() { 

        const mobility = this.props.mobility;

        return ( 
            <Fragment>
                <h2 className="text-center my-5">Reporte de Movilidad</h2>

                <table className="table">
                    <thead>
                        <tr className="table-success">
                            <th scope="col">Bloques</th>
                            <th scope="col">Máquinas</th>
                            <th scope="col">Operadores</th>
                            <th scope="col">Productos</th>
                            <th scope="col">Indicadores</th>
                            <th scope="col">Observaciones</th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr>
                            <td>
                                {mobility.squares.map((item, index) => {
                                    if(item.squareNumber === "" || item.squareNumber === null){
                                        return(
                                            <tr>
                                                <td className="text-center text-danger font-table">
                                                    No hay información
                                                </td>
                                            </tr>
                                        )
                                    }
                                    else{
                                        return(
                                            <tr key={index}>
                                                <td className="text-center font-table">
                                                    {item.squareNumber}
                                                </td>
                                            </tr>
                                        )
                                    }
                                })}
                            </td>
                            <td>
                                {mobility.machines.map((item, index) => {
                                    if(item.machineNumber === "" || item.machineNumber === null){
                                        return(
                                            <tr>
                                                <td className="text-center text-danger font-table">
                                                    No hay información
                                                </td>
                                            </tr>
                                        )
                                    }
                                    else{
                                        return(
                                            <tr key={index}>
                                                <td className="text-center font-table">
                                                    {item.machineNumber}
                                                </td>
                                            </tr>
                                        )
                                    }
                                })}
                            </td>
                            <td>
                                {mobility.operators.map((item, index) => {
                                    if(item.name === "" || item.name === null){
                                        return(
                                            <tr>
                                                <td className="text-center text-danger font-table">
                                                    No hay información
                                                </td>
                                            </tr>
                                        )
                                    }
                                    else{
                                        return(
                                            <tr key={index}>
                                                <td className="text-center font-table">
                                                    {item.name}
                                                </td>
                                            </tr>
                                        )
                                    }
                                })}
                            </td>
                            <td>
                                {mobility.products.map((item, index) => {
                                    if(item.productName === "" || item.productName === null){
                                        return(
                                            <tr>
                                                <td className="text-center text-danger font-table">
                                                    No hay información
                                                </td>
                                            </tr>
                                        )
                                    }
                                    else{
                                        return(
                                            <tr key={index}>
                                                <td className="text-center font-table">
                                                    {item.productName}
                                                </td>
                                            </tr>
                                        )
                                    }
                                })}
                            </td>
                            <td>
                                {mobility.indicators.map((item, index) => {
                                    if(item.indicator === ""){
                                        return(
                                            <tr>
                                                <td className="text-center text-danger font-table">
                                                    No hay información
                                                </td>
                                            </tr>
                                        )
                                    }
                                    else{
                                        return(
                                            <tr key={index}>
                                                <td className="text-center font-table">
                                                    {item.indicator}
                                                </td>
                                            </tr>
                                        )
                                    }
                                })}
                            </td>
                            <td>
                                {mobility.observations.map((item, index) => {
                                    if(item.observation === ""){
                                        return(
                                            <tr>
                                                <td className="text-center text-danger font-table">
                                                    No hay información
                                                </td>
                                            </tr>
                                        )
                                    }
                                    else{
                                        return(
                                            <tr key={index}>
                                                <td className="text-center font-table">
                                                    {item.observation}
                                                </td>
                                            </tr>
                                        )
                                    }
                                })}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </Fragment>
        );
    }
}
 
export default MobilityTable;