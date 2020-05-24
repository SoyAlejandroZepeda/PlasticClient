import React, { Component, Fragment } from 'react';
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

//Import Queries
import { Query } from 'react-apollo';
import { GET_DEPARTMENT, GET_MONTH } from '../Queries';

//Styles
import '../../styles.css';


class GraphMonth extends Component {
    state = {  }
    render() { 

        //Destructuring data
        const month = this.props.month;
        const department = this.props.department

        //Assigment Data values from Array
        const data = this.props.mobilities;

        //Destructuring indicators data
        const arrayIndicators = [];
        data.map(item => {
            arrayIndicators.push(item.indicators);
        })

        //Assign indicators from Array
        const array = []
        const indicators = []
        arrayIndicators.map((item, index) => {
            array[index] = {
                ...item.map(indicator => {
                    indicators.push(indicator)
                })
            }
        })
        
        //Filters Array For Colors
        const red = indicators.filter(indicators => indicators.indicator === "ROJO");
        const yellow = indicators.filter(indicators => indicators.indicator === "AMARILLO");
        const green = indicators.filter(indicators => indicators.indicator === "VERDE");
        const gray = indicators.filter(indicators => indicators.indicator === "GRIS");

        //Get Percent values of array
        const percentRed = (red.length * 100) / indicators.length;
        const percentYellow = (yellow.length * 100) / indicators.length;
        const percentGreen = (green.length * 100) / indicators.length;
        const percentGray = (gray.length * 100) / indicators.length;

        //Push values to percent of array
        const arrayIndicator = [];
        indicators.map(item => {
            if(item.indicator === "ROJO"){
                arrayIndicator.push({id: 1, indicator: item.indicator, percent: percentRed, bgColor: "rgba(178, 34, 34, 0.8)"});
            }
            if(item.indicator === "AMARILLO"){
                arrayIndicator.push({id: 2, indicator: item.indicator, percent: percentYellow, bgColor: "rgba(255, 215, 0, 0.8)"});
            }
            if(item.indicator === "VERDE"){
                arrayIndicator.push({id: 3, indicator: item.indicator, percent: percentGreen, bgColor: "rgba(34, 139, 34, 0.8)"});
            }
            if(item.indicator === "GRIS"){
                arrayIndicator.push({id: 4, indicator: item.indicator, percent: percentGray, bgColor: "rgba(169, 169, 169, 0.8)"});
            }
        });

        //Filter values repeat of array
        const hash = {}
        const values = arrayIndicator.filter(item => {
            const exist = !hash[item.id, item.indicator, item.percent, item.bgColor] || false;
            hash[item.id, item.indicator, item.percent, item.bgColor] = true;
            return exist;
        });


        return ( 
            <Fragment>
                <h2 className="text-center mb-3">Gráfica de movilidad mensual</h2>

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
                                query={GET_MONTH}
                                variables={{id: month}}
                            >
                            {({loading, error, data}) => {
                                if(loading) return 'Loading...';
                                if(error) return `Error: ${error.message}`;
                                const dataMonth = data.getMonth;
                                return(
                                    <h4 className="text-center mb-5 font-italic"> {dataDepartment.departmentName} - {dataMonth.month} </h4>
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
 
export default GraphMonth;