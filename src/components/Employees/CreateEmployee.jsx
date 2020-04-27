import React, { Component, Fragment } from 'react';
import CreateFormEmployee from './CreateFormEmployee';

//Queries
import {Query} from 'react-apollo';
import { GET_DEPARTMENTS, GET_POSITIONS } from '../Queries';

//Spinner
import '../../spinner.css';

class CreateEmployee extends Component {
    state = {  }
    render() { 
        return ( 
            <Fragment>
                <Query
                    query={GET_DEPARTMENTS}
                    pollInterval={1000}
                >
                {({loading, error, data, startPolling, stopPolling}) => {
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

                    const departmentData = (data.getDepartments);

                    return(
                        <Fragment>
                            <Query
                                query={GET_POSITIONS}
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

                                const positionData = (data.getPositions);

                                return(
                                    <CreateFormEmployee 
                                        department={departmentData}
                                        position={positionData}
                                    />
                                )
                            }}

                            </Query>
                        </Fragment>
                    )
                }}

                </Query>
            </Fragment>
        );
    }
}
 
export default CreateEmployee;