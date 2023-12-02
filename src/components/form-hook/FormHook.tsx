import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { schema } from '../../shared/validationHook';
import CountryOptions from '../country-options/CountryOptions';

export default function FormHook() {
  const {
    register,
    handleSubmit,
    formState: { errors /* , isValid */ },
  } = useForm({
    // mode: 'onBlur',
    resolver: yupResolver(schema),
  });

  function onSubmitHandelr(data) {
    console.log(data);
    alert(JSON.stringify(data));
    console.log('submite');
  }

  function handleClick() {
    // console.log(yup.ref('password'));
    // console.log(schema);
  }
  return (
    <form className="form" onSubmit={handleSubmit(onSubmitHandelr)}>
      <fieldset className="form-uncontrolled">
        <label className="form__field">
          <span className="field__title">Name</span>
          <div className="input-container">
            <input
              {...register('name')}
              className="field__input field__input_width"
              name="name"
              type="text"
            />
            <div className="input__validate">{errors.name?.message}</div>
          </div>
        </label>
        <label className="form__field">
          <span className="field__title">Age</span>
          <div className="input-container">
            <input
              {...register('age')}
              className="field__input field__input_width"
              name="age"
              type="number"
            />
            <div className="input__validate">{errors.age?.message}</div>
          </div>
        </label>
        <label className="form__field">
          <span className="field__title">Email</span>
          <div className="input-container">
            <input
              {...register('email')}
              className="field__input field__input_width"
              name="email"
              type="email"
            />
            <div className="input__validate">{errors.email?.message}</div>
          </div>
        </label>
        <label className="form__field">
          <span className="field__title">Password</span>
          <div className="input-container">
            <input
              {...register('password')}
              className="field__input field__input_width"
              name="password"
              type="password"
            />
            <div className="input__validate">{errors.password?.message}</div>
          </div>
        </label>
        <label className="form__field">
          <span className="field__title">Repeat password</span>
          <div className="input-container">
            <input
              {...register('repeatPassword')}
              className="field__input field__input_width"
              name="repeatPassword"
              type="password"
            />
            <div className="input__validate">
              {errors.repeatPassword?.message}
            </div>
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
              {...register('accept')}
              className="field__input field__input_check"
              name="accept"
              type="checkbox"
            />
            <div className="input__validate">{errors.accept?.message}</div>
          </div>
        </label>
        <label htmlFor="file" className="form__field">
          <span className="field__title">Input your image</span>
          <div className="input-container">
            <input
              // {...register('image')}
              className="field__input field__input_fontsize"
              style={{ width: '100%', border: 'none' }}
              id="file"
              name="image"
              type="file"
            />
            <div className="input__validate" hidden>
              {errors.image?.message}
            </div>
          </div>
        </label>
        <label className="form__field">
          <span className="field__title">Country</span>
          <div className="input-container">
            <input
              {...register('country')}
              className="field__input field__input_width"
              list="countryList"
              name="country"
              type="text"
            />
            <div className="input__validate">{errors.country?.message}</div>
            <CountryOptions />
          </div>
        </label>
        <input
          className="submit-button"
          type="submit"
          value="Submit form"
          onClick={handleClick}
          // disabled={!isValid}
        />
      </fieldset>
    </form>
  );
}
