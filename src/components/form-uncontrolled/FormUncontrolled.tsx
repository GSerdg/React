import { useRef } from 'react';
import { nameValidation } from '../../shared/validation';
import './Form-uncontrolled.css';

export default function FormUncontrolled() {
  const nameRef: React.MutableRefObject<null | HTMLInputElement> = useRef(null);

  function checkName() {
    const name = nameRef.current?.value;
    if (!name) return;

    const validation = nameValidation({ title: name });
    const titleElement = nameRef.current?.nextElementSibling as HTMLDivElement;

    if (typeof validation === 'string') {
      titleElement.innerText = validation;
      titleElement.hidden = false;
      nameRef.current?.classList.add('field__input_color');
    } else {
      titleElement.hidden = true;
      nameRef.current?.classList.remove('field__input_color');
    }
  }

  function handleClick(event: React.FormEvent<HTMLInputElement>) {
    event.preventDefault();
    checkName();
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
              /* required */
            />
            <div className="input__validate" hidden></div>
          </div>
        </label>
        <label className="form__field">
          <span className="field__title">Age</span>
          <input
            className="field__input"
            name="age"
            type="date" /* required */
          />
        </label>
        <label className="form__field">
          <span className="field__title">Email</span>
          <input
            className="field__input"
            name="email"
            type="email" /* required */
          />
        </label>
        <label className="form__field">
          <span className="field__title">Password</span>
          <input
            className="field__input"
            name="passwd"
            type="password"
            /* required */
          />
        </label>
        <label className="form__field">
          <span className="field__title">Replase password</span>
          <input
            className="field__input"
            name="passwdRepl"
            type="password"
            /* required */
          />
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
          <div className="field__input">
            <input
              className="field__input_check"
              name="checkbox"
              type="checkbox"
            />
          </div>
        </label>
        <label htmlFor="file" className="form__field">
          <span className="field__title">Input your image</span>
          <input
            className="field__input field__input_fontsize"
            id="file"
            name="image"
            type="file"
          />
        </label>
        <label className="form__field">
          <span className="field__title">Country</span>
          <input
            className="field__input"
            name="country"
            type="text"
            autoComplete="country-name"
            /* required */
          />
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
