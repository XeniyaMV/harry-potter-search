import getFullClassName from '../../helpers/getFullClassName';
import { SelectProps } from '../../types';

const Select = (props: SelectProps): JSX.Element => {
  const fullClassName = getFullClassName('select', props.additionalClassName);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    if (props.handleChangeValue) props.handleChangeValue(event.target.value);
  };

  return (
    <div data-testid="select-component" className={fullClassName}>
      <span className="select__title">{props.title}</span>
      <select className="select__select" onChange={handleChange} value={props.value}>
        {props.options.map((option) => (
          <option className="select__option" key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
