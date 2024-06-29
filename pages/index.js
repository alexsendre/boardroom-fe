import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../utils/context/authContext';
import RegisterForm from '../components/forms/RegisterForm';
import { checkUser } from '../utils/auth';

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
  }

  return <RegisterForm userObj={user} onUpdate={onUpdate} />;
}

export default Home;
