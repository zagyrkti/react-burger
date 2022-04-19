import { ChangeEvent, Dispatch, useCallback, useState } from 'react';


type TUseForm = <T>(
    initialValuesState: T,
    validityInitialState?: boolean
) => {
  values: T,
  handleChange: (evt: ChangeEvent<HTMLInputElement>) => void,
  resetForm: (
      newValues: { [key: string]: string }
  ) => void,
  errors: { [key: string]: string },
  isValid: boolean,
  setValues: Dispatch<T>
};

const useForm: TUseForm = (initialValuesState, validityInitialState = true) => {

  const [values, setValues] = useState<typeof initialValuesState>(initialValuesState);

  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(validityInitialState);

  const handleChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const input = evt.target;
    const value = input.type === 'checkbox' ? input.checked : input.value;
    const name = input.name;

    setValues({ ...values, [name]: value });
    if (!(input.type === 'checkbox')) {
      setErrors({ ...errors, [name]: input.validationMessage });
      const validity = input.closest("form")?.checkValidity() || validityInitialState
      setIsValid(validity);
    }
  };

  const resetForm = useCallback((newValues = initialValuesState, newErrors = {}, newIsValid = false) => {
        setValues(newValues);
        setErrors(newErrors);
        setIsValid(newIsValid);
      },
      [setValues, setErrors, setIsValid]
  );

  return { values, handleChange, resetForm, errors, isValid, setValues };
}


export default useForm;