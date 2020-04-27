import React, { Component, Fragment } from 'react'
import EditFormSquare from './EditFormSquare';

//Queries
import { Query } from 'react-apollo';
import { GET_SQUARE, GET_DEPARTMENTS_SQUARE } from '../Queries';

//Spinner
import '../../spinner.css';

class EditSquare extends Component {
    state = {  }
    render() { 

        //Take ID from Square
        const {id} = this.props.match.params
        
        return ( 
            <Fragment>
                <h2 className="text-center">Editar Bloque</h2>

                <div className="row justify-content-center">
                    <Query
                        query={GET_SQUARE}
                        variables={{id}}
                    >
                    {({loading, error, data, refetch}) => {
                        if(loading) return (
                            <Fragment>
                                <div className="sk-cube-grid">
                                    <div className="sk-cube sk-cube1"></div>
                                    <div className="sk-cube sk-cube2"></div>
                                    <div className="sk-cube sk-cube3"></div>
                                    <div className="sk-cube sk-cube4"></div>
                                    <div className="sk-cube sk-cube5"></div>
                                    <div className="sk-cube sk-cube6"></div>
                                    <div className="sk-cube sk-cube7"></div>
                                    <div className="sk-cube sk-cube8"></div>
                                    <div className="sk-cube sk-cube9"></div>
                                </div>
                                <p className="text-center loading-text">Loading...</p>  
                            
                            </Fragment>
                        );
                        if(error) return `Error: ${error.message}`;

                        const dataSquare = data;

                        return (
                            <Fragment>
                                <Query
                                    query={GET_DEPARTMENTS_SQUARE}
                                    pollInterval={1000}
                                >
                                {({loading, error, data, startPolling, stopPollig}) => {

                                    if(loading) return (
                                        <Fragment>
                                            <div className="sk-cube-grid">
                                                <div className="sk-cube sk-cube1"></div>
                                                <div className="sk-cube sk-cube2"></div>
                                                <div className="sk-cube sk-cube3"></div>
                                                <div className="sk-cube sk-cube4"></div>
                                                <div className="sk-cube sk-cube5"></div>
                                                <div className="sk-cube sk-cube6"></div>
                                                <div className="sk-cube sk-cube7"></div>
                                                <div className="sk-cube sk-cube8"></div>
                                                <div className="sk-cube sk-cube9"></div>
                                            </div>
                                            <p className="text-center loading-text">Loading...</p>  
                                        
                                        </Fragment>
                                    );

                                    if(error) return `Error: ${error.message}`;

                                    return (
                                        <EditFormSquare 
                                            square={dataSquare}
                                            department={data.getDepartmentsSquare}
                                            id={id}
                                            refetch={refetch}  
                                        /> 
                                    );

                                }}

                                </Query>
                            </Fragment>
                        );

                    }}

                    </Query>

                </div>
            </Fragment>
        );
    }
}
 
export default EditSquare;