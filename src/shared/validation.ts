import * as yup from 'yup';

const nameSchema = yup.object().shape({
  title: yup
    .string()
    .required('Enter your name')
    .matches(/^[A-Z]/, 'The first letter should be upper case'),
});

const ageSchema = yup.object().shape({
  title: yup.number().required().min(1),
});

const emailSchema = yup.object().shape({
  title: yup
    .string()
    .required('Enter your email')
    .matches(
      /^\S+$/,
      'Email address must not contain leading or trailing whitespace'
    )
    .matches(
      /^[-a-z0-9A-Z!#$%&'*+/=?^_`{|}~]+(\.[-a-z0-9A-Z!#$%&'*+/=?^_`{|}~]+)*/,
      'Email address must contain correct email'
    )
    .matches(
      /@/,
      'Email address must contain an "@" symbol separating local part and domain name'
    )
    .matches(
      /@([a-z0-9]([a-z0-9]{0,61}[-a-z0-9])?\.)(aero|arpa|asia|biz|cat|com|coop|edu|gov|info|int|jobs|mil|mobi|museum|name|net|org|pro|tel|travel|[a-z][a-z])$/,
      'Email address must contain a domain name (e.g., example.com)'
    )
    .email('Email address must be properly formatted (e.g., user@example.com)'),
});

const passwordSchema = yup.object().shape({
  title: yup
    .string()
    .required('Enter password')
    .min(8, 'Password too short')
    .matches(
      /[A-Z]/,
      'Password must contain at least one uppercase letter (A-Z)'
    )
    .matches(
      /[a-z]/,
      'Password must contain at least one lowercase letter (a-z)'
    )
    .matches(/[0-9]/, 'Password must contain at least one digit (0-9)')
    .matches(
      /[\W_]/,
      'Password must contain at least one special character (e.g., !@#$%^&*-)'
    )
    .matches(
      /^\S+\S+$/,
      'Password must not contain leading or trailing whitespace'
    ),
});

const repeatPasswordSchema = yup.object().shape({
  password: yup.string(),
  repeatPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Repeat your password'),
});

const acceptSchema = yup.object().shape({
  title: yup
    .bool()
    .oneOf([true], 'You must accept the terms and conditions')
    .required(),
});

const imageSchema = yup.object().shape({
  title: yup
    .array<yup.AnyObject, File>()
    .nullable()
    .required('Choose some image')
    .test(
      'is-correct-file',
      'the image must be no more than 5 megabytes',
      checkImageWeight
    )
    .test(
      'is-big-file',
      'the image must be .png or .jpeg format',
      checkImageType
    ),
});

function checkImageWeight(image?: File[]): boolean {
  let isValid = true;
  if (image) {
    const size = image[0].size / 1024 / 1024;
    if (size > 5) {
      isValid = false;
    }
  }

  return isValid;
}

function checkImageType(image?: File[]): boolean {
  let isValid = true;
  if (image) {
    if (!['image/jpeg', 'image/png'].includes(image[0].type)) {
      isValid = false;
    }
  }
  return isValid;
}

export function nameValidation(value: yup.InferType<typeof nameSchema>) {
  try {
    const validate = nameSchema.validateSync(value);
    return validate;
  } catch (error) {
    return (error as Error).message;
  }
}

export function ageValidation(value: yup.InferType<typeof nameSchema>) {
  try {
    const validate = ageSchema.validateSync(value);
    return validate;
  } catch (error) {
    return (error as Error).message;
  }
}

export function emailValidation(value: yup.InferType<typeof emailSchema>) {
  try {
    const validate = emailSchema.validateSync(value);
    return validate;
  } catch (error) {
    return (error as Error).message;
  }
}

export function passwordValidation(
  value: yup.InferType<typeof passwordSchema>
) {
  try {
    const validate = passwordSchema.validateSync(value);
    return validate;
  } catch (error) {
    return (error as Error).message;
  }
}

export function repeatPasswordValidation(
  value: yup.InferType<typeof repeatPasswordSchema>
) {
  try {
    const validate = repeatPasswordSchema.validateSync(value);
    return validate;
  } catch (error) {
    return (error as Error).message;
  }
}

export function acceptValidation(value: yup.InferType<typeof acceptSchema>) {
  try {
    const validate = acceptSchema.validateSync(value);
    return validate;
  } catch (error) {
    return (error as Error).message;
  }
}

export function imageValidation(value: yup.InferType<typeof imageSchema>) {
  try {
    const validate = imageSchema.validateSync(value);
    return validate;
  } catch (error) {
    return (error as Error).message;
  }
}
