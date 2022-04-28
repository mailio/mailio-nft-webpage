import { Button } from "@mui/material";
import { Component, ErrorInfo, ReactNode, useState } from "react";
import ClientError from "./client-error";

interface Props {
    children: ReactNode;
}

interface State {
    hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {

    constructor(props: Props) {
        super(props);

        this.state = { hasError: false };
    }

    public state: State = {
        hasError: false,
    }

    public static getDerivedStateFromError(_: Error): State {
        return { hasError: true };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
        console.error("Uncatched error", error, errorInfo);
    }

    handleReset = () => {
        this.setState({ hasError: false });
    }

    render() {
        // Check if the error is thrown
        if (this.state.hasError) {
            // You can render any custom fallback UI
            return (
                <ClientError reset={this.handleReset} />
            )
        }

        // Return children components in case of no error

        return this.props.children
    }
}

export default ErrorBoundary;