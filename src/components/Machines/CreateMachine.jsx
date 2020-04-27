import React, { Component, Fragment } from 'react';
import CreateFormMachine from './CreateFormMachine';

//Import Queries
import { Query } from 'react-apollo';
import { GET_ALL_SQUARES } from '../Queries';

//Spinner
import '../../spinner.css';

class CreateMachine extends Component {
    state = {  }
    render() { 
        return ( 
            <Fragment>
                <Query
                    query={GET_ALL_SQUARES}
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

                    return(
                        <CreateFormMachine 
                            square={data.getAllSquares}
                        />
                    )
                }}

                </Query>
            </Fragment>
        );
    }
}
 
export default CreateMachine;