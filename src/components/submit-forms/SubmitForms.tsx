import { useSelector } from '../../shared/useSelector';
import './SubmitForms.css';
import cl from 'classnames';

export default function SubmitForms() {
  const formData = useSelector((state) => state.form.value);
  console.log(formData);
  const formsList = formData.map((item, index) => {
    return (
      <div
        className={cl('forms-list', {
          ['forms-list_border']: index === formData.length - 1,
        })}
        key={index}
      >
        <div className="submit-data">
          <p>Name: {item.name}</p>
          <p>Age: {item.age}</p>
          <p>Email: {item.email}</p>
          <p>Password: {item.password}</p>
          <p>Gender: {item.gender}</p>
          <p>T&C: {item.accept && 'accept'}</p>
          <p>Country: {item.country}</p>
        </div>
        <img className="image" src={item.image} />
      </div>
    );
  });

  return <>{formsList.reverse()}</>;
}
