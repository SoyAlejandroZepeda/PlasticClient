import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';

//Queries
import { Mutation } from 'react-apollo';
import { CREATE_DAY } from '../Mutations';

//Icons
import Icon from 'react-icons-kit';
import {floppyDisk} from 'react-icons-kit/icomoon/floppyDisk';

const initialState = {
    dayNumber: '',
    dayName: '',
    week: ''
}

class CreateFormDay extends Component {

    state = { 
        dayNumber: '',
        dayName: '',
        week: this.props.week.id
    }

    //Clean State
    cleanState = () => {
        this.setState({
            ...initialState
        });
    }

    //Update State
    updateState = e => {
        const { name, value } = e.target;

        this.setState({
            [name]: value
        });
    }

    //Validate Form
    validateForm = () => {
        const { dayNumber, dayName } = this.state;
        const noValid = !dayNumber || !dayName;
        return noValid;
    }

    //Create Day
    createNewDay = (e, newDay) => {
        e.preventDefault();

        //New Day at database
        newDay().then(data => {
            this.cleanState();

            this.props.history.push(`/movilidad/mes/${this.props.month}/semana/${this.props.week.id}`);
        })
    }
    
    render() { 

        //Function destructuring
        const { dayNumber, dayName, week } = this.state;

        const input = {
            dayNumber: Number(dayNumber),
            dayName,
            week
        }

        return ( 
            <Fragment>
                <div className="row justify-content-center">

                    <Mutation
                        mutation={CREATE_DAY}
                        variables={{input}}
                    >
                    {(newDay, {loading, error, data}) => {

                        return (
                            <form
                                className="col-md-4"
                                onSubmit={e => this.createNewDay(e, newDay)}
                            >

                                <div className="form-group">
                                    <label>Número del dia: </label>
                                    <input 
                                        type="number"
                                        name="dayNumber"
                                        className="form-control"
                                        placeholder="Ingrese el número del día"
                                        autoComplete="off"
                                        spellCheck="false"
                                        autoFocus
                                        value={this.state.dayNumber}
                                        onChange={this.updateState}
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Nombre del día: </label>
                                    <input 
                                        type="text"
                                        name="dayName"
                                        className="form-control"
                                        placeholder="Ingrese el nombre del día"
                                        autoComplete="off"
                                        spellCheck="false"
                                        value={this.state.dayName}
                                        onChange={this.updateState}
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="btn btn-success float-right font-weight-bold"
                                    disabled={this.validateForm()}
                                >
                                    <Icon icon={floppyDisk} /> Crear Registro
                                </button>

                            </form>
                        );

                    }}

                    </Mutation>

                </div>
            </Fragment>
        );
    }
}
 
export default withRouter(CreateFormDay);