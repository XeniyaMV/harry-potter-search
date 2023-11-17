import { render, screen, fireEvent } from '@testing-library/react';
import Select from '../UI/select/Select';

describe('Select', () => {
  it('renders Select component', () => {
    const selectProps = {
      options: ['opt1', 'opt2', 'opt3'],
      value: 'opt1',
      title: 'Select an option',
      handleChangeValue: jest.fn(),
      additionalClassName: 'custom-class',
    };
    render(<Select {...selectProps} />);
    const selectElement = screen.getByTestId('select-component');
    expect(selectElement).toBeInTheDocument();
  });

  it('renders Select component with provided props', () => {
    const selectProps = {
      options: ['opt1', 'opt2', 'opt3'],
      value: 'opt1',
      title: 'Select an option',
      handleChangeValue: jest.fn(),
      additionalClassName: 'custom-class',
    };
    render(<Select {...selectProps} />);

    const selectElement = screen.getByTestId('select-component');
    const titleElement = screen.getByText('Select an option');
    const optionElements = screen.getAllByRole('option');

    expect(titleElement).toBeInTheDocument();
    expect(optionElements.length).toBe(3);

    expect(selectElement).toHaveClass('select custom-class');
    expect(titleElement).toHaveTextContent('Select an option');
    expect(screen.getByDisplayValue('opt1')).toBeInTheDocument();
  });

  it('calls handleChangeValue when an option is selected', () => {
    const selectProps = {
      options: ['opt1', 'opt2', 'opt3'],
      value: 'opt1',
      title: 'Select an option',
      handleChangeValue: jest.fn(),
      additionalClassName: 'custom-class',
    };

    render(<Select {...selectProps} />);

    const selectElement: HTMLSelectElement | null = screen.getByTestId('select-component').querySelector('select');
    expect(selectElement).toBeInTheDocument();

    if (selectElement) {
      fireEvent.change(selectElement, {
        target: { value: 'opt2' },
      });

      expect(selectProps.handleChangeValue).toHaveBeenCalledWith('opt2');
    }
  });
});
