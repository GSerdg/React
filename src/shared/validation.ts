import * as yup from 'yup';

const nameSchema = yup.object().shape({
  title: yup
    .string()
    .required('Enter your name')
    .matches(/^[A-Z]/, 'The first letter should be upper case'),
});

export function nameValidation(name: yup.InferType<typeof nameSchema>) {
  try {
    const validate = nameSchema.validateSync(name);
    return validate;
  } catch (error) {
    return (error as Error).message;
  }
}
