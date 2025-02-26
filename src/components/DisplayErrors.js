import React from 'react';

const DisplayErrors = ({ error }) => {
    return error ? (
        <span className="text-primaryRed text-sm m-2 p-2">{error}</span>
    ) : null;
};

export default DisplayErrors;
