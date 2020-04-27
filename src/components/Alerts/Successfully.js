import React from 'react';

const Successfully = ({message}) => {
    return(
        <p className="alert alert-success py-3 text-center my-3">{message}</p>
    );
}

export default Successfully;