//higher order component -> hoc

import React from 'react';
import ReactDom from 'react-dom';

const Info = (props) => (
    <div>
        <h1>Info</h1>
        <p>info is: {props.info}</p>
    </div>
)

const withAdminWarning = (WrappedComponent) => {
    return (props) => (
        <div>
            <p>this is private info, dont share</p>
            <WrappedComponent {...props}/>
        </div>
    )
};

const requireAuth = (WrappedComponent) => {
    return (props) =>(
        <div>
            {props.isAuthenticated ? (
            <WrappedComponent {...props} />
            ) : (
                <p>please authenticate</p>
            )}
        </div>
    )
}

const AdminInfo = withAdminWarning(Info);
const AuthInfo = requireAuth(Info);

ReactDom.render(<AuthInfo isAuthenticated={true} info="details" />, document.getElementById('app'))
