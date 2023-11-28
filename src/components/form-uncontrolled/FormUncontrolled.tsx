export default function FormUncontrolled() {
  return (
    <form>
      <label>
        <span>Name</span>
        <input name="name" type="text" required />
      </label>
      <label>
        <span>Age</span>
        <input name="age" type="date" required />
      </label>
      <label>
        <span>Email</span>
        <input name="email" type="email" required />
      </label>
      <label>
        <span>Password</span>
        <input name="passwd" type="password" required />
      </label>
      <label>
        <span>Replase password</span>
        <input name="passwdRepl" type="password" required />
      </label>
      <fieldset>
        <legend>Choise your gender</legend>
        <label htmlFor="m">M</label>
        <input id="m" name="gender" type="radio" value={'male'} />
        <label htmlFor="f">F</label>
        <input id="f" name="gender" type="radio" value={'female'} />
      </fieldset>
      <fieldset>
        <label htmlFor="accept">Accept our T&C</label>
        <input id="accept" name="checkbox" type="checkbox" />
      </fieldset>
      <label>
        <span>Input your image</span>
        <input name="image" type="file" />
        <input type="submit" value="Load" />
      </label>
    </form>
  );
}
