import { useRef } from 'react';
import CountryOptions from '../country-options/CountryOptions';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setFormData } from '../../app/formSlice';
import {
  checkName,
  checkAge,
  checkEmail,
  checkPassword,
  checkRepeatPassword,
  checkAccept,
  checkImage,
  checkCountry,
} from '../../shared/checkInputFields';
import './FormUncontrolled.css';

export default function FormUncontrolled() {
  const nameRef = useRef<HTMLInputElement>(null);
  const ageRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const repeatPasswordRef = useRef<HTMLInputElement>(null);
  const acceptRef = useRef<HTMLInputElement>(null);
  const imageRef = useRef<HTMLInputElement>(null);
  const countryRef = useRef<HTMLInputElement>(null);
  const maleRef = useRef<HTMLInputElement>(null);
  const femaleRef = useRef<HTMLInputElement>(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleSubmit(event: React.FormEvent<HTMLButtonElement>) {
    event.preventDefault();
    const validate = [
      checkName(nameRef),
      checkAge(ageRef),
      checkEmail(emailRef),
      checkPassword(passwordRef),
      checkRepeatPassword(passwordRef, repeatPasswordRef),
      checkAccept(acceptRef),
      checkImage(imageRef),
      checkCountry(countryRef),
    ];

    if (validate.every((item) => item == true)) {
      const getGender = () => {
        if (maleRef.current?.checked) return 'male';
        if (femaleRef.current?.checked) return 'female';
        return undefined;
      };
      const image = imageRef.current?.files?.[0];
      const fileReader = new FileReader();

      fileReader.onload = (loadEvent) => {
        const imageBase64 = loadEvent.target?.result;
        dispatch(
          setFormData({
            name: nameRef.current?.value,
            age: ageRef.current?.value,
            email: emailRef.current?.value,
            password: passwordRef.current?.value,
            gender: getGender(),
            accept: true,
            image: imageBase64,
            country: countryRef.current?.value,
          })
        );
        navigate('/');
      };
      image && fileReader.readAsDataURL(image);
    }
  }

  return (
    <form className="form">
      <fieldset className="form-uncontrolled">
        <label className="form__field">
          <span className="field__title">Name</span>
          <div className="input-container input-container_height">
            <input
              className="field__input field__input_width"
              ref={nameRef}
              name="name"
              type="text"
            />
            <div className="input__validation-messages" hidden></div>
          </div>
        </label>
        <label className="form__field">
          <span className="field__title">Age</span>
          <div className="input-container input-container_height">
            <input
              className="field__input field__input_width"
              ref={ageRef}
              name="age"
              type="number"
            />
            <div className="input__validation-messages" hidden></div>
          </div>
        </label>
        <label className="form__field">
          <span className="field__title">Email</span>
          <div className="input-container input-container_height">
            <input
              className="field__input field__input_width"
              ref={emailRef}
              name="email"
              type="email"
            />
            <div className="input__validation-messages" hidden></div>
          </div>
        </label>
        <label className="form__field">
          <span className="field__title">Password</span>
          <div className="input-container input-container_height">
            <input
              className="field__input field__input_width"
              ref={passwordRef}
              name="password"
              type="password"
            />
            <div className="input__validation-messages" hidden></div>
          </div>
        </label>
        <label className="form__field">
          <span className="field__title">Repeat password</span>
          <div className="input-container input-container_height">
            <input
              className="field__input field__input_width"
              ref={repeatPasswordRef}
              name="passwdRepl"
              type="password"
            />
            <div className="input__validation-messages" hidden></div>
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
          <div className="input-container input-container_height">
            <input
              className="field__input field__input_check"
              ref={acceptRef}
              name="checkbox"
              type="checkbox"
            />
            <div className="input__validation-messages" hidden></div>
          </div>
        </label>
        <label htmlFor="file" className="form__field">
          <span className="field__title">Input your image</span>
          <div className="input-container input-container_height">
            <input
              className="field__input field__input_fontsize"
              style={{ width: '100%', border: 'none' }}
              ref={imageRef}
              id="file"
              name="image"
              type="file"
            />
            <div className="input__validation-messages" hidden></div>
          </div>
        </label>
        <label className="form__field">
          <span className="field__title">Country</span>
          <div className="input-container input-container_height">
            <input
              className="field__input field__input_width"
              ref={countryRef}
              list="countryList"
              name="country"
              type="text"
            />
            <div className="input__validation-messages" hidden></div>
            <CountryOptions />
          </div>
        </label>
        <button
          className="submit-button"
          type="submit"
          value=""
          onClick={handleSubmit}
        >
          Submit form
        </button>
      </fieldset>
    </form>
  );
}
