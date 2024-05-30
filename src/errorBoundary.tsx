import { ReactNode } from 'react';
import { Component } from 'react';

class ErrorBoundary extends Component<{ children: ReactNode }> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: unknown, info: unknown) {
    console.error('ErrorBoundary caught an error', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="bg-yellow-200 p-6 text-red-800">
          <h2 className="font-bold">Sorry, something went wrong</h2>
          <p className="text-slate-700">
            It looks like we have hit an issue while retrieving that data.
            Please{' '}
            <a
              href="javascript: window.location.reload()"
              className="text-red-800 hover:text-slate-700"
            >
              refresh
            </a>{' '}
            the page or try again later.
          </p>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
