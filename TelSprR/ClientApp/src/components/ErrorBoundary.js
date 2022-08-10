import React, { Component } from 'react';
import { Navigate } from 'react-router';


export default class ErrorBoundary extends Component {
    constructor(props) {
        super(props);

        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        //logErrorToMyService(error, errorInfo);
        console.log("componentDidCatch", error, errorInfo);
        this.setState({ hasError : true});
    }

    render() {
        if (this.state.hasError) {
            return <Navigate to="/" replace={true} />
            //return <h3>Произошла ошибка</h3>
        } 

        return this.props.children;

    }
}