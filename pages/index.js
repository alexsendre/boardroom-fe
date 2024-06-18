import { useEffect, useState } from 'react';
import { checkUser } from '../utils/auth';
import { useAuth } from '../utils/context/authContext';
import RegisterForm from '../components/forms/RegisterForm';

function Home() {
  const [authUser, setAuthUser] = useState();
  const { user } = useAuth();

  const currentUser = () => {
    checkUser(user.uid)?.then((x) => {
      if (x.uid) {
        setAuthUser(x);
      } else {
        setAuthUser(null);
      }
    });
  };

  console.log(authUser);

  useEffect(() => {
    currentUser();
  }, [user]);

  return <RegisterForm />;
}

export default Home;
