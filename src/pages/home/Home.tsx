import { Link, Outlet } from 'react-router-dom';
import './home.css';
import { PATHS } from '../../main';

export default function Home() {
  return (
    <>
      <div className="page">Choose Form</div>
      <div>
        <Link to={PATHS.UNCONTROLLED} style={{ padding: '0 15px 0 0' }}>
          Form uncontrolled components
        </Link>
        <Link to={PATHS.HOOK}>React Hook Form</Link>
      </div>
      <Outlet />
    </>
  );
}
