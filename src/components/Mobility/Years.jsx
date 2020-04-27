import React, { Component, Fragment } from 'react';
import makeAnimated from 'react-select/animated';
import Select from 'react-select';
import Months from './Months';

const initialState = {
    year: ''
}

class Years extends Component {
    state = { 
        ...initialState
    }

    //Update State
    updateState = e => {
        const { name, value } = e.target;

        this.setState({
            [name]: value
        });
    }

    //Show Options Years
    getAllYears = (year) => {
        this.setState({
            year
        });
    }

    render() { 

        return ( 
            <Fragment>
                <div className="row justify-content-center">

                    <div className="col-md-4">

                        <div className="form-group">
                            <Select 
                                onChange={this.getAllYears}
                                options={this.props.year}
                                components={makeAnimated()}
                                placeholder={'Seleccione el año'}
                                getOptionValue={(options) => options.id}
                                getOptionLabel={(options) => options.year}
                                value={this.state.year}
                            />
                        </div>

                    </div>

                    <div className="table d-flex justify-content-center">
                        <Months 
                            year={this.state.year.id}
                        />
                    </div>


                </div>
            </Fragment>
        );
    }
}
 
export default Years;