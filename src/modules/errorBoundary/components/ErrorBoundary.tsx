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
      return (
        <section className="error-section">
          <ErrorMessage additionalClassName="error-section__message" errorMessage="Oops... Something went wrong" />
          <button className="button error-section__reload" onClick={(): void => this.setState({ hasError: false })}>
            Reload page
          </button>
        </section>
      );
    }
    return this.props.children || <></>;
  }
}

export default ErrorBoundary;
