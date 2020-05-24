import React, { Component, Fragment } from 'react';
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

//Queries
import { Query } from 'react-apollo';
import { GET_DEPARTMENT, GET_DAY } from '../Queries';

//Styles
import '../../styles.css';

class GraphDay extends Component {
    state = {  }
    render() { 

        const department = this.props.department;
        const day = this.props.day;

        //Assignment Data values of Array
        const data = this.props.mobility.indicators;    

        //Filter Arrays for color
        const red = data.filter(data => data.indicator === "ROJO");
        const yellow = data.filter(data => data.indicator === "AMARILLO");
        const green = data.filter(data => data.indicator === "VERDE");
        const gray = data.filter(data => data.indicator === "GRIS");

        //Get Percent values of array
        const percentRed = (red.length * 100) / data.length;
        const percentYellow = (yellow.length * 100) / data.length;
        const percentGreen = (green.length * 100) / data.length;
        const percentGray = (gray.length * 100) / data.length;

        //Push values to percent of array
        const array = [];
        data.map(item => {
            if(item.indicator === "ROJO"){
                array.push({id: 1, indicator: item.indicator, percent: percentRed, bgColor: "rgba(178, 34, 34, 0.8)"});
            }
            if(item.indicator === "AMARILLO"){
                array.push({id: 2, indicator: item.indicator, percent: percentYellow, bgColor: "rgba(255, 215, 0, 0.8)"});
            }
            if(item.indicator === "VERDE"){
                array.push({id: 3, indicator: item.indicator, percent: percentGreen, bgColor: "rgba(34, 139, 34, 0.8)"});
            }
            if(item.indicator === "GRIS"){
                array.push({id: 4, indicator: item.indicator, percent: percentGray, bgColor: "rgba(169, 169, 169, 0.8)"});
            }
        });

        //Filter values repeat of array
        const hash = {}
        const values = array.filter(item => {
            const exist = !hash[item.id, item.indicator, item.percent, item.bgColor] || false;
            hash[item.id, item.indicator, item.percent, item.bgColor] = true;
            return exist;
        });

        return ( 
            <Fragment>
                <h2 className="text-center mb-3">Gráfica de movilidad diaria</h2>

                <Query
                    query={GET_DEPARTMENT}
                    variables={{id: department}}
                >
                {({loading, error, data}) => {
                    if(loading) return 'Loading...';
                    if(error) return `Error: ${error.message}`;
                    const dataDepartment = data.getDepartment;
                    return(
                        <Fragment>
                            <Query
                                query={GET_DAY}
                                variables={{id: day}}
                            >
                            {({loading, error, data}) => {
                                if(loading) return 'Loading...';
                                if(error) return `Error: ${error.message}`;
                                const dataDay = data.getDay;
                                return(
                                    <h4 className="text-center mb-5 font-italic"> {dataDepartment.departmentName} - DIA {dataDay.dayName} {dataDay.dayNumber} </h4>
                                )
                            }}

                            </Query>
                        </Fragment>
                    )
                }}

                </Query>

                <div className="row justify-content-center">
                    <BarChart width={900} height={300} data={values}
                    margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                    <CartesianGrid strokeDasharray="3 3"/>
                    <XAxis dataKey="indicator"/>
                    <YAxis />
                    <Tooltip/>
                    <Bar dataKey="percent"  />
                    </BarChart>
                </div>
                <div className="mt-3">
                    <fieldset className="scheduler-border">
                        <legend className="scheduler-border">INDICADORES</legend>
                            <div className="row justify-content-center">
                                <div className="mr-5">
                                    <p className="red font-weight-bold">ROJO: <span className=" black font-weight-normal">Máquina fuera de rotación permitida.</span> </p>
                                    <p className="gray font-weight-bold">GRIS: <span className=" black font-weight-normal">Máquina detenida.</span> </p>
                                </div>
                                <div>
                                    <p className="green font-weight-bold">VERDE: <span className="black font-weight-normal">Máquina trabaja con el titular.</span> </p>
                                    <p className="yellow font-weight-bold">AMARILLO: <span className="black font-weight-normal">Máquina trabaja con el suplente del bloque.</span> </p>
                                </div>
                            </div>
                    </fieldset>
                </div>
            </Fragment>
        );
    }
}
 
export default GraphDay;