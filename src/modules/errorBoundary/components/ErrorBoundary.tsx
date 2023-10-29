import { Component, ErrorInfo } from 'react';
import ErrorMessage from '../../../UI/errorMessage/ErrorMessage';
import { Props, ErrorBoundaryState } from '../../../types';

class ErrorBoundary extends Component<Props> {
  public state = {
    hasError: false,
  };

  public static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.log(`Oops... \n error: ${error} \n error info: ${errorInfo.componentStack}`);
    this.setState({ hasError: true });
  }

  public render(): JSX.Element {
    if (this.state.hasError) {
      return <ErrorMessage errorMessage="Oops... Something went wrong" />;
    }
    return this.props.children || <></>;
  }
}

export default ErrorBoundary;
