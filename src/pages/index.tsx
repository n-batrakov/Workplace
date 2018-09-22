import React from 'react';


export class NotFoundPage extends React.Component {
    public render() {
        return <h1>Not found</h1>;
    }
}

export class ErrorPage extends React.Component {
    public render() {
        return (
            <div>
                <h1>Oops...</h1>
                <p>There was an internal server error.</p>
                <p>Please refresh the page or contact the support.</p>
            </div>
            
        );
    }
}