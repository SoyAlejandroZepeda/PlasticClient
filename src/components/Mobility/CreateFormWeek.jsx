import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';

//Queries
import { Mutation } from 'react-apollo';
import { CREATE_WEEK } from '../Mutations';

//Icons
import Icon from 'react-icons-kit';
import {floppyDisk} from 'react-icons-kit/icomoon/floppyDisk';

const initialState = {
    week: '',
    month: ''
}

class CreateFormWeek extends Component {

    state = { 
        week: '',
        month: this.props.month.id
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
        const { week } = this.state;
        const noValid = !week;
        return noValid;
    }

    //Create Week
    createNewWeek = (e, newWeek) => {
        e.preventDefault();

        //New Week at database
        newWeek().then(data => {
            this.cleanState();

            this.props.history.push(`/movilidad/mes/${this.props.month.id}`);
        })
    }

    render() { 

        //Function destructuring
        const { week, month } = this.state;

        const input = {
            week: Number(week),
            month
        }

        return ( 
            <Fragment>
                <div className="row justify-content-center">

                    <Mutation
                        mutation={CREATE_WEEK}
                        variables={{input}}
                    >
                    {(newWeek, {loading, error, data}) => {

                        return (
                            <form
                                className="col-md-4"
                                onSubmit={e => this.createNewWeek(e, newWeek)}
                            >

                                <div className="form-group">
                                    <label>Semana: </label>
                                    <input 
                                        type="number"
                                        name="week"
                                        className="form-control"
                                        placeholder="Ingrese el número de semana"
                                        autoComplete="off"
                                        spellCheck="false"
                                        autoFocus
                                        value={this.state.week}
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
 
export default withRouter(CreateFormWeek);