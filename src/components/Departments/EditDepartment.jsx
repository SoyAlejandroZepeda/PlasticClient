import React, { Component, Fragment } from 'react';
import EditFormDepartment from './EditFormDepartment';

//Queries
import { Query } from 'react-apollo';
import { GET_DEPARTMENT } from '../Queries';

//Spinner
import '../../spinner.css';

class EditDepartment extends Component {
    state = {  }
    render() { 

        //Take ID
        const {id} = this.props.match.params;

        return ( 
            <Fragment>
                <h2 className="text-center mb-5">Editar Departamento</h2>

                <div className="row justify-content-center">
                    <Query
                        query={ GET_DEPARTMENT }
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
                            if(error) return `Error: ${error.message}`

                            return (
                                <EditFormDepartment 
                                    department={data}
                                    id={id}
                                    refetch={refetch}
                                />
                            )
                        }}
                    </Query>
                </div>
            </Fragment>
        );
    }
}
 
export default EditDepartment;
