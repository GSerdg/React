import {
  nameValidation,
  ageValidation,
  emailValidation,
  passwordValidation,
  repeatPasswordValidation,
  acceptValidation,
  imageValidation,
  countryValidation,
} from './validationUncontrolled';

function editDom(
  validation:
    | string
    | {
        title: string | number | boolean | File[];
      }
    | {
        password?: string | undefined;
        repeatPassword: string;
      },
  refElement: React.MutableRefObject<HTMLInputElement | null>
) {
  const titleElement = refElement.current?.nextElementSibling as HTMLDivElement;

  if (typeof validation === 'string') {
    titleElement.innerText = validation;
    titleElement.hidden = false;
    refElement.current?.classList.add('field__input_color');
    return false;
  } else {
    titleElement.hidden = true;
    refElement.current?.classList.remove('field__input_color');
    return true;
  }
}

export function checkName(
  nameRef: React.MutableRefObject<HTMLInputElement | null>
) {
  const name = nameRef.current?.value;
  if (name === undefined) return;

  const validation = nameValidation({ title: name });

  return editDom(validation, nameRef);
}

export function checkAge(
  ageRef: React.MutableRefObject<null | HTMLInputElement>
) {
  const age = ageRef.current?.value;
  if (age === undefined) return;

  let validation:
    | string
    | {
        title: string | number;
      };

  age === ''
    ? (validation = 'Enter yuor age')
    : (validation = ageValidation({ title: age }));

  return editDom(validation, ageRef);
}

export function checkEmail(
  emailRef: React.MutableRefObject<null | HTMLInputElement>
) {
  const email = emailRef.current?.value;
  if (email === undefined) return;

  const validation = emailValidation({ title: email });

  return editDom(validation, emailRef);
}

export function checkPassword(
  passwordRef: React.MutableRefObject<null | HTMLInputElement>
) {
  const password = passwordRef.current?.value;
  if (password === undefined) return;

  const validation = passwordValidation({ title: password });

  return editDom(validation, passwordRef);
}

export function checkRepeatPassword(
  passwordRef: React.MutableRefObject<null | HTMLInputElement>,
  repeatPasswordRef: React.MutableRefObject<null | HTMLInputElement>
) {
  const password = passwordRef.current?.value;
  const repeatPassword = repeatPasswordRef.current?.value;

  if (!password || !repeatPassword) return;
  const validation = repeatPasswordValidation({
    password: password,
    repeatPassword: repeatPassword,
  });

  return editDom(validation, repeatPasswordRef);
}

export function checkAccept(
  acceptRef: React.MutableRefObject<null | HTMLInputElement>
) {
  const isAccept = acceptRef.current?.checked;
  if (isAccept === undefined) return;

  const validation = acceptValidation({ title: isAccept });

  return editDom(validation, acceptRef);
}

export function checkImage(
  imageRef: React.MutableRefObject<null | HTMLInputElement>
) {
  const image = imageRef.current?.files;
  if (!image) return;

  let validation:
    | string
    | {
        title: File[];
      };

  image[0]
    ? (validation = imageValidation({ title: Array.from(image) }))
    : (validation = 'Choose some image');

  return editDom(validation, imageRef);
}

export function checkCountry(
  countryRef: React.MutableRefObject<null | HTMLInputElement>
) {
  const country = countryRef.current?.value;
  if (country === undefined) return;

  const validation = countryValidation({ title: country });

  return editDom(validation, countryRef);
}
