import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { AppState } from '../store/store';

export const useAuthRedirect = (isProtected: boolean) => {
  const { token } = useSelector((state: AppState) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (isProtected && !token) {
      navigate('/login');
    } else if (!isProtected && token) {
      navigate('/home');
    }
  }, [isProtected, token, navigate]);
};
