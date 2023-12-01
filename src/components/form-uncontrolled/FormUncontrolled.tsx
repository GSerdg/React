import { useRef } from 'react';
import {
  acceptValidation,
  ageValidation,
  emailValidation,
  imageValidation,
  nameValidation,
  passwordValidation,
  repeatPasswordValidation,
} from '../../shared/validation';
import './Form-uncontrolled.css';
import CountryList from '../countryList/CountryList';

export default function FormUncontrolled() {
  const nameRef: React.MutableRefObject<null | HTMLInputElement> = useRef(null);
  const ageRef: React.MutableRefObject<null | HTMLInputElement> = useRef(null);
  const emailRef: React.MutableRefObject<null | HTMLInputElement> =
    useRef(null);
  const passwordRef: React.MutableRefObject<null | HTMLInputElement> =
    useRef(null);
  const repeatPasswordRef: React.MutableRefObject<null | HTMLInputElement> =
    useRef(null);
  const acceptRef: React.MutableRefObject<null | HTMLInputElement> =
    useRef(null);
  const imageRef: React.MutableRefObject<null | HTMLInputElement> =
    useRef(null);
  const countryRef: React.MutableRefObject<null | HTMLInputElement> =
    useRef(null);

  // const [inputCountry, setInputCountry] = useState('');
  // const [countryValue, setCountryValue] = useState('');

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
    const titleElement = refElement.current
      ?.nextElementSibling as HTMLDivElement;

    if (typeof validation === 'string') {
      titleElement.innerText = validation;
      titleElement.hidden = false;
      refElement.current?.classList.add('field__input_color');
    } else {
      titleElement.hidden = true;
      refElement.current?.classList.remove('field__input_color');
    }
  }

  function checkName() {
    const name = nameRef.current?.value;
    if (name === undefined) return;

    const validation = nameValidation({ title: name });

    editDom(validation, nameRef);
  }

  function checkAge() {
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

    editDom(validation, ageRef);
  }

  function checkEmail() {
    const email = emailRef.current?.value;
    if (email === undefined) return;

    const validation = emailValidation({ title: email });

    editDom(validation, emailRef);
  }

  function checkPassword() {
    const password = passwordRef.current?.value;
    if (password === undefined) return;

    const validation = passwordValidation({ title: password });

    editDom(validation, passwordRef);
  }

  function checkRepeatPassword() {
    const password = passwordRef.current?.value;
    const repeatPassword = repeatPasswordRef.current?.value;

    if (!password || !repeatPassword) return;
    const validation = repeatPasswordValidation({
      password: password,
      repeatPassword: repeatPassword,
    });

    editDom(validation, repeatPasswordRef);
  }

  function checkAccept() {
    const isAccept = acceptRef.current?.checked;
    if (isAccept === undefined) return;

    const validation = acceptValidation({ title: isAccept });

    editDom(validation, acceptRef);
  }

  function checkImage() {
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

    editDom(validation, imageRef);
  }

  function handleClick(event: React.FormEvent<HTMLInputElement>) {
    event.preventDefault();
    checkName();
    checkAge();
    checkEmail();
    checkPassword();
    checkRepeatPassword();
    checkAccept();
    checkImage();
  }

  /*   function handleChangeCountry(event: React.FormEvent<HTMLInputElement>) {
    const target = event.target as HTMLInputElement;
    const value = target.value;
    setInputCountry(value);
  }
 */

  return (
    <form className="form">
      <fieldset className="form-uncontrolled">
        <label className="form__field">
          <span className="field__title">Name</span>
          <div className="input-container">
            <input
              className="field__input field__input_width"
              ref={nameRef}
              name="name"
              type="text"
            />
            <div className="input__validate" hidden></div>
          </div>
        </label>
        <label className="form__field">
          <span className="field__title">Age</span>
          <div className="input-container">
            <input
              className="field__input field__input_width"
              ref={ageRef}
              name="age"
              type="number"
            />
            <div className="input__validate" hidden></div>
          </div>
        </label>
        <label className="form__field">
          <span className="field__title">Email</span>
          <div className="input-container">
            <input
              className="field__input field__input_width"
              ref={emailRef}
              name="email"
              type="email"
            />
            <div className="input__validate" hidden></div>
          </div>
        </label>
        <label className="form__field">
          <span className="field__title">Password</span>
          <div className="input-container">
            <input
              className="field__input field__input_width"
              ref={passwordRef}
              name="password"
              type="password"
            />
            <div className="input__validate" hidden></div>
          </div>
        </label>
        <label className="form__field">
          <span className="field__title">Repeat password</span>
          <div className="input-container">
            <input
              className="field__input field__input_width"
              ref={repeatPasswordRef}
              name="passwdRepl"
              type="password"
            />
            <div className="input__validate" hidden></div>
          </div>
        </label>
        <div className="form__field">
          <span className="field__title">Choise your gender</span>
          <div className="field__input">
            <label htmlFor="m">male</label>
            <input
              className="field__input_check"
              id="m"
              name="gender"
              type="radio"
              value={'male'}
              defaultChecked
            />
            <label htmlFor="f">female</label>
            <input
              className="field__input_check"
              id="f"
              name="gender"
              type="radio"
              value={'female'}
            />
          </div>
        </div>
        <label className="form__field">
          <span className="field__title">Accept our T&C</span>
          <div className="input-container">
            <input
              className="field__input field__input_check"
              ref={acceptRef}
              name="checkbox"
              type="checkbox"
            />
            <div className="input__validate" hidden></div>
          </div>
        </label>
        <label htmlFor="file" className="form__field">
          <span className="field__title">Input your image</span>
          <div className="input-container">
            <input
              className="field__input field__input_fontsize"
              style={{ width: '100%', border: 'none' }}
              ref={imageRef}
              id="file"
              name="image"
              type="file"
            />
            <div className="input__validate" hidden></div>
          </div>
        </label>
        <label className="form__field">
          <span className="field__title">Country</span>
          <input
            className="field__input"
            ref={countryRef}
            list="countryList"
            name="country"
            type="text"
            // onChange={handleChangeCountry}
          />
          <CountryList />
        </label>
        <input
          className="submit-button"
          type="submit"
          value="Submit form"
          onClick={handleClick}
        />
      </fieldset>
    </form>
  );
}
