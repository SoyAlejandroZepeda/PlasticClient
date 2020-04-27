import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom';
import Squares from './Squares';

//Import Queries
import {Query} from 'react-apollo';
import {GET_SQUARES} from '../Queries';

//Icons
import Icon from 'react-icons-kit';
import {arrowLeft} from 'react-icons-kit/icomoon/arrowLeft';

//Spinner
import '../../spinner.css';

class SquaresDepartment extends Component {
    state = { }

    render() { 

        //Take ID of Department
        const department = this.props.match.params.id;

        return ( 
            <Fragment>

                <Link to={'/movilidad/departamentos'} className="btn btn-primary font-weight-bold" >
                    <Icon icon={arrowLeft} /> Regresar
                </Link>

                <h2 className="text-center mb-5">Bloques</h2>

                <div className="row">

                    <Query
                        query={GET_SQUARES}
                        pollInterval={1000}
                        variables={{department}}
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
                            data.getSquares.map(square => (
                                <Squares 
                                    key={square.id}
                                    square={square}
                                    department={department}
                                />
                            ))
                        );
                    }}

                    </Query>
                </div>

            </Fragment>
        );
    }
}
 
export default SquaresDepartment;