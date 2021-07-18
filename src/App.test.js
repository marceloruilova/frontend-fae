import { render, screen } from '@testing-library/react';
import App from './App';

describe('App', () => {
  test('renders login', () => {
    render(<App />);
    expect(screen.getByText('Login')).toBeInTheDocument();
  });
});
