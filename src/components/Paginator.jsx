import React, { Component } from 'react'

//Icons
import Icon from 'react-icons-kit';
import {previous2} from 'react-icons-kit/icomoon/previous2';
import {next2} from 'react-icons-kit/icomoon/next2';

class Paginator extends Component {
    state = { 
        paginator: {
            pages: Math.ceil(Number(this.props.total) / this.props.limit)
        }
    }

    render() { 

        const {current} = this.props;
        const btnPrevious = (current > 1) 
            ?  <button 
                    onClick={this.props.previousPage} 
                    type="button"
                    className="btn btn-success mr-2"
                >
                    <Icon icon={previous2} /> Anterior
                </button>
            :   '';

        const {pages} = this.state.paginator;
        const btnNext = (current !== pages)
            ?   <button
                onClick={this.props.nextPage}
                type="button"
                className="btn btn-success mr-2"
                >
                Siguiente <Icon icon={next2} />
                </button>
            :   '';

        return ( 
            <div className="mt-5 d-flex justify-content-center">
                {btnPrevious}
                {btnNext}
            </div>
        );
    }
}
 
export default Paginator;