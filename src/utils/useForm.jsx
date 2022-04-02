import { useCallback, useState } from 'react';

const useForm = (initialValuesState, validityInitialState = true) => {

  const [values, setValues] = useState(initialValuesState || {});

  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(validityInitialState);

  const handleChange = (evt) => {
    const input = evt.target;
    const value = input.type === 'checkbox' ? input.checked : input.value;
    const name = input.name;

    setValues({ ...values, [name]: value });
    if (!(input.type === 'checkbox')) {
      setErrors({ ...errors, [name]: input.validationMessage });
      setIsValid(input.closest("form").checkValidity());
    }
  };

  const resetForm = useCallback((newValues = {}, newErrors = {}, newIsValid = false) => {
        setValues(newValues);
        setErrors(newErrors);
        setIsValid(newIsValid);
      },
      [setValues, setErrors, setIsValid]
  );

  return { values, handleChange, resetForm, errors, isValid, setValues };
}


export default useForm;