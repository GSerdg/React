import { Link, Outlet } from 'react-router-dom';
import './home.css';
import { PATHS } from '../../main';

export default function Home() {
  return (
    <>
      <div className="page">Choise Form</div>
      <div>
        <Link to={PATHS.UNCONTROLLED}>Form uncontrolled components</Link>
        <Link to={PATHS.HOOK}>React Hook Form</Link>
      </div>
      <Outlet />
    </>
  );
}
