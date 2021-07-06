import React from 'react';
import {Link} from 'react-router-dom';

const NotFoundPage = () =>  {
    return(
        <div>
            404: page not found
            <Link to="/">Go Home</Link>
        </div>
    )
}

export default NotFoundPage;