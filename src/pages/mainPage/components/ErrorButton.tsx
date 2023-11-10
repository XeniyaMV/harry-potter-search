import { useState } from 'react';

const ErrorButton = (): JSX.Element => {
  const [hasError, setHasError] = useState(false);

  const handleOnClick = (): void => {
    setHasError(!hasError);
  };

  if (hasError) {
    throw Error('This is a test error');
  }

  return (
    <button className="button error-button" onClick={(): void => handleOnClick()}>
      See Error
    </button>
  );
};

export default ErrorButton;
