import React, { Component } from 'react';
import T from 'i18n-react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error, info) {
    this.setState({ hasError: true });
  }

  render() {
    if (this.state.hasError) {
      return <h1>{T.translate('somethingWhentWrong')}</h1>;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
