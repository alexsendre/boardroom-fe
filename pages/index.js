import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { checkUser } from '../utils/auth';
import { useAuth } from '../utils/context/authContext';
import RegisterForm from '../components/forms/RegisterForm';

function Home() {
  const { user } = useAuth();
  const router = useRouter();
  const [authUser, setAuthUser] = useState({});

  useEffect(() => {
    checkUser(user.uid).then(setAuthUser);
  }, []);

  const onUpdate = () => {
    checkUser(user.uid).then((data) => {
      setAuthUser(data);
    });
  };

  if (authUser.uid === user.uid) {
    router.push('/feed');
    return null;
  }

  return <RegisterForm user={user} updateUser={onUpdate} />;
}

export default Home;
