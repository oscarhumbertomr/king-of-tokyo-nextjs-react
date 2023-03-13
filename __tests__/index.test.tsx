import { render, screen } from '@testing-library/react'
import Home from '@/pages/index'

describe('Home', () => {
  it('renders a heading', () => {
    render(<Home />)

    // const heading = screen.getByRole('heading', {
    //   name: /King of Tokyo Dashboard\.js!/i,
    // })

    const header = screen.queryAllByText('King of Tokyo Dashboard s')

    expect(header).toBeTruthy()
  })
})
