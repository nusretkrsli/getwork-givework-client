import { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import userService from '../services/userService';
import { useNavigate } from 'react-router-dom';

const useCheckUser = () => {
  const { user, isAuthenticated } = useAuth0();
  let navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(user);
  const checkUser = async () => {
    if (isAuthenticated) {
      const remoteUser = await userService.getUser(user.email);
      if (remoteUser) {
        setCurrentUser({
          ...user,
          role:remoteUser.role,
          id:remoteUser.id
        })
        navigate('/dashboard');
      } else {
        navigate('/welcome');
      }
    }
  };

  useEffect(() => {
    checkUser();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  // Return any necessary values as an array or an object
  return currentUser;
};

export default useCheckUser;