import React, { Component, Fragment } from 'react';

//Icons
import Icon from 'react-icons-kit';
import {checkmark} from 'react-icons-kit/icomoon/checkmark'
import {cross} from 'react-icons-kit/icomoon/cross';

class ButtonStatus extends Component {
    state = {}

    render() { 

        const machine = this.props.operators.machine

        return ( 
            <Fragment>
                {machine
                    ? 
                    <button
                        type="button"
                        className='btn btn-outline-success font-weight-bold btn-block'
                        disabled
                    >
                        <Icon icon={checkmark} />  Asignado
                    </button>
                    :
                    <button
                        type="button"
                        className='btn btn-outline-danger font-weight-bold btn-block'
                        disabled
                    >
                       <Icon icon={cross} /> Sin Asignar
                    </button>
                }
            </Fragment>
        );
    }
}
 
export default ButtonStatus;