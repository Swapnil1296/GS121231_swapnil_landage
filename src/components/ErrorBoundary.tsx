import { Component, ErrorInfo, ReactNode } from 'react';

interface ErrorBoundaryProps {
    children: ReactNode;
}

interface ErrorBoundaryState {
    hasError: boolean;
    errorInfo?: ErrorInfo;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
    state: ErrorBoundaryState = { hasError: false };

    static getDerivedStateFromError(error: Error): ErrorBoundaryState {
        console.error('Error boundary caught error:', error);
        return { hasError: true };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        this.setState({ errorInfo });
        console.error('Uncaught error:', error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="p-8 bg-red-50 min-h-screen flex items-center justify-center">
                    <div className="max-w-2xl text-center">
                        <h2 className="text-2xl font-bold text-red-600 mb-4">
                            ⚠️ Something went wrong
                        </h2>
                        <p className="text-gray-600 mb-4">
                            We're sorry, but an unexpected error occurred. Please try refreshing the page
                            or contact support if the problem persists.
                        </p>
                        <button
                            onClick={() => window.location.reload()}
                            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                        >
                            Reload Page
                        </button>
                        {this.state.errorInfo && (
                            <details className="mt-4 text-left text-gray-500">
                                <summary>Error details</summary>
                                <pre className="whitespace-pre-wrap mt-2">
                                    {this.state.errorInfo.componentStack}
                                </pre>
                            </details>
                        )}
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}