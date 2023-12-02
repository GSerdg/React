import * as yup from 'yup';

export const schema = yup.object().shape({
  name: yup
    .string()
    .required('Enter your name')
    .matches(/^[A-Z]/, 'The first letter should be upper case'),
  age: yup
    .string()
    .required('Enter your age')
    .matches(/[1-9]+/, 'title must be greater than or equal to 1'),
  email: yup
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
  password: yup
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
  repeatPassword: yup
    .string()
    .required('Repeat your password')
    .oneOf([yup.ref('password')], 'Passwords must match'),
  accept: yup
    .bool()
    .required()
    .oneOf([true], 'You must accept the terms and conditions'),
  image: yup
    .mixed<FileList>()
    .test('required', 'Add your image', (image) => {
      return image?.length === 0 ? false : true;
    })
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
  country: yup.string().required('Enter your country'),
  gender: yup
    .string()
    .required()
    .oneOf(['male', 'female'], 'Choose your gender'),
  // genderFemale: yup.bool().nullable().required().oneOf([true, false], ''),
});

function checkImageWeight(image?: FileList): boolean {
  let isValid = true;
  if (image && image.length > 0) {
    const size = image[0].size / 1024 / 1024;
    if (size > 5) {
      isValid = false;
    }
  }

  return isValid;
}

function checkImageType(image?: FileList): boolean {
  let isValid = true;
  if (
    image &&
    image.length > 0 &&
    !['image/jpeg', 'image/png'].includes(image[0].type)
  ) {
    isValid = false;
  }
  return isValid;
}
