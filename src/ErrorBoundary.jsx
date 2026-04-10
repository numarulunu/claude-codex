import { Component } from 'react';

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('[Claude Codex] Render crash:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      const errorMsg = this.state.error?.message
        ? String(this.state.error.message)
        : 'Unknown error';
      return (
        <div style={{ padding: '2rem', textAlign: 'center', fontFamily: 'system-ui' }}>
          <h2>Something went wrong</h2>
          <p style={{ color: '#666', margin: '1rem 0' }}>{errorMsg}</p>
          <p style={{ color: '#999', fontSize: '0.8rem' }}>
            Check browser console (F12) for details
          </p>
          <button onClick={() => this.setState({ hasError: false, error: null })}
                  style={{ padding: '0.5rem 1rem', cursor: 'pointer', marginRight: '0.5rem' }}>
            Try Again
          </button>
          <button onClick={() => {
            localStorage.clear();
            window.location.reload();
          }}
                  style={{ padding: '0.5rem 1rem', cursor: 'pointer', background: '#e74c3c', color: 'white', border: 'none', borderRadius: '4px' }}>
            Reset & Reload
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
