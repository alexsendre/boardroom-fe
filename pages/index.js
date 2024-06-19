import { useAuth } from '../utils/context/authContext';
import RegisterForm from '../components/forms/RegisterForm';
import Feed from './feed';

function Home() {
  const { user } = useAuth();
  const isRegistered = user?.id;

  if (!isRegistered) {
    return (<RegisterForm />);
  }

  return <Feed />;
}

export default Home;
