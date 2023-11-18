import { render, screen } from '@testing-library/react';
import StartScreen from '../modules/startScreen';

jest.mock('../assets/hogwarts.png', () => require('./__mock__/image-start-screen'));

describe('StartScreen', () => {
  it('renders StartScreen component', () => {
    render(<StartScreen />);

    expect(screen.getByTestId('start-screen-component')).toBeInTheDocument();
  });
});
