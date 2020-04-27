import React, { Component, Fragment } from 'react';
import EditFormMachine from './EditFormMachine';

//Import Queries
import { Query } from 'react-apollo';
import { GET_MACHINE, GET_ALL_SQUARES } from '../Queries';

//Spinner
import '../../spinner.css';

class EditMachine extends Component {
    state = {  }
    render() { 

        //Take ID from Machine
        const {id} = this.props.match.params;

        return ( 
            <Fragment>
                <h2 className="text-center">Editar Máquina</h2>

                <div className="row justify-content-center">
                    <Query
                        query={GET_MACHINE}
                        variables={{id}}
                    >
                    {({loading, error, data, refetch}) => {
                        if(loading) return(
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

                        const dataMachine = data;

                        return(
                            <Fragment>
                                <Query
                                    query={GET_ALL_SQUARES}
                                    pollInterval={1000}
                                >
                                {({loading, error, data, startPolling, stopPolling}) => {
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
                                        <EditFormMachine 
                                            machine={dataMachine}
                                            square={data.getAllSquares}
                                            id={id}
                                            refetch={refetch}
                                        />
                                    );
                                }}

                                </Query>
                            </Fragment>
                        )
                    }}

                    </Query>
                </div>
            </Fragment>
        );
    }
}
 
export default EditMachine;