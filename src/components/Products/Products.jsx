import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';

//Import Mutations
import { Mutation } from 'react-apollo';
import { DELETE_PRODUCT } from '../Mutations';

//Alert
import Successfully from '../Alerts/Successfully';

//Icons
import Icon from 'react-icons-kit';
import {pencil} from 'react-icons-kit/icomoon/pencil';
import {cross} from 'react-icons-kit/icomoon/cross';

class Products extends Component {
    state = { 
        alert: {
            show: false,
            message: ''
        }
    }
    render() { 

        const {product} = this.props;

        const date = new Date(Number(product.register));
        const last = new Date(Number(product.updated));

        const {alert: {show, message}} = this.state;
        const alert = (show) ? <Successfully message={message} /> : '';

        const {id} = this.props.product;

        return ( 
            <Fragment>
                {alert}

                <div className="col-md-4">
                    <div className={`card mb-3`}>
                        <div className="card-body">
                            <p className="card-text font-weight-bold">ID del producto: 
                                <span className="font-weight-normal"> {product.id} </span>
                            </p>
                            <p className="card-text font-weight-bold">Nombre del producto: 
                                <span className="font-weight-normal"> {product.productName} </span>
                            </p>
                            <p className="card-text font-weight-bold">Número de parte: 
                                <span className="font-weight-normal"> {product.partNumber} </span>
                            </p>
                            <p className="card-text font-weight-bold">Fecha de creación: 
                                <span className="font-weight-normal"> {date.toLocaleString("es-MX")} </span>
                            </p>
                            <p className="card-text font-weight-bold">Ultima modificación: 
                                <span className="font-weight-normal"> {last.toLocaleString("es-MX")} </span>
                            </p>

                            <Link to={`/productos/editar/${product.id}`}
                                className="btn btn-warning font-weight-bold d-block mb-2"
                            >
                                <Icon icon={pencil} /> Editar Producto
                            </Link>

                            <Mutation
                                mutation={DELETE_PRODUCT}
                                onCompleted={(data) => {
                                    this.setState({
                                        alert: {
                                            show: true,
                                            message: data.deleteProduct
                                        }
                                    }, () => {
                                        setTimeout(() => {
                                            this.setState({
                                                alert: {
                                                    show: false,
                                                    message: ''
                                                }
                                            });
                                        }, 3000);
                                    });
                                }}
                            >
                            {deleteProduct => (
                                <button
                                    type="button"
                                    className="btn btn-danger btn-block font-weight-bold"
                                    onClick={() => {
                                        if(window.confirm('¿Desea eliminar este producto?')){
                                            deleteProduct({
                                                variables: {id}
                                            });
                                        }
                                    }}
                                >
                                    <Icon icon={cross} /> Eliminar Producto
                                </button>
                            )}

                            </Mutation>
                            
                        </div>
                    </div>
                </div>
            </Fragment>
        );
    }
}
 
export default Products;