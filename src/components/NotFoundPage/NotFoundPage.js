import React from 'react';
import { Alert } from 'react-bootstrap';

const NotFoundPage = () => {
    return (
        <>
            <Alert key={'danger'} variant={'danger'}>
                Not found
            </Alert>
        </>
    );
};

export default NotFoundPage;
