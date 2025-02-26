import React from 'react';
export const ErrorList = ({ errors }) => {

    const listItems = errors.map(([field, message]) => (
                                <li key={field}>{message}</li>
                            ))
    if (errors.length === 0) return null;
    return (
        <div className="relative m-3 p-3 text-white bg-primaryRed">
           <ul>{listItems}</ul>
        </div>
    );
};

export default ErrorList;
