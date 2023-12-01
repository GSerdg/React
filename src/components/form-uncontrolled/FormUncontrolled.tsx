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
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setFormUncontrolledData } from '../../app/formUncontrolledSlice';

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
  const maleRef: React.MutableRefObject<null | HTMLInputElement> = useRef(null);
  const femaleRef: React.MutableRefObject<null | HTMLInputElement> =
    useRef(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

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
      return false;
    } else {
      titleElement.hidden = true;
      refElement.current?.classList.remove('field__input_color');
      return true;
    }
  }

  function checkName() {
    const name = nameRef.current?.value;
    if (name === undefined) return;

    const validation = nameValidation({ title: name });

    return editDom(validation, nameRef);
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

    return editDom(validation, ageRef);
  }

  function checkEmail() {
    const email = emailRef.current?.value;
    if (email === undefined) return;

    const validation = emailValidation({ title: email });

    return editDom(validation, emailRef);
  }

  function checkPassword() {
    const password = passwordRef.current?.value;
    if (password === undefined) return;

    const validation = passwordValidation({ title: password });

    return editDom(validation, passwordRef);
  }

  function checkRepeatPassword() {
    const password = passwordRef.current?.value;
    const repeatPassword = repeatPasswordRef.current?.value;

    if (!password || !repeatPassword) return;
    const validation = repeatPasswordValidation({
      password: password,
      repeatPassword: repeatPassword,
    });

    return editDom(validation, repeatPasswordRef);
  }

  function checkAccept() {
    const isAccept = acceptRef.current?.checked;
    if (isAccept === undefined) return;

    const validation = acceptValidation({ title: isAccept });

    return editDom(validation, acceptRef);
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

    return editDom(validation, imageRef);
  }

  function handleClick(event: React.FormEvent<HTMLInputElement>) {
    event.preventDefault();
    const validate = [
      checkName(),
      checkAge(),
      checkEmail(),
      checkPassword(),
      checkRepeatPassword(),
      checkAccept(),
      checkImage(),
    ];

    if (validate.every((item) => item == true)) {
      const gender = () => {
        if (maleRef.current?.checked) return 'male';
        if (femaleRef.current?.checked) return 'female';
        return undefined;
      };

      dispatch(
        setFormUncontrolledData({
          name: nameRef.current?.value,
          age: ageRef.current?.value,
          email: emailRef.current?.value,
          password: passwordRef.current?.value,
          gender: gender(),
          accept: true,
          country: countryRef.current?.value,
        })
      );
      navigate('/');
    }
  }

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
              ref={maleRef}
              id="m"
              name="gender"
              type="radio"
              value={'male'}
              defaultChecked
            />
            <label htmlFor="f">female</label>
            <input
              className="field__input_check"
              ref={femaleRef}
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
