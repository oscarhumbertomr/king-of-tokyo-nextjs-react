import { render, screen } from '@testing-library/react';
import Home from '@/pages/index';

describe('Home', () => {
  it('renders a heading', () => {
    render(<Home />);
    const header = screen.getByText('King of Tokyo Dashboard');
    expect(header).toBeTruthy();
  });
});
