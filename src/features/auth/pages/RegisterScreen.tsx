import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { AppDispatch, AppState } from '../../../store/store';
import { handleRegister } from '../redux/authSlice';
import AlertComponent from '../../../components/Alerts/AlertComponent';
import { Link } from 'react-router-dom';
import { useAuthRedirect } from '../../../hooks/useAuthRedirect';

const RegisterScreen: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [formError, setFormError] = useState<{
    email?: string;
    password?: string;
    confirmPassword?: string;
  }>({});
  const [alertVisible, setAlertVisible] = useState<boolean>(false);

  const dispatch: AppDispatch = useDispatch();
  const {
    loading: authLoading,
    error,
    user,
    token,
  } = useSelector((state: AppState) => state.auth);
  const navigate = useNavigate();

  useAuthRedirect(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError({});

    if (!email) {
      setFormError((prev) => ({ ...prev, email: 'El correo es obligatorio.' }));
      return;
    }

    if (!email.includes('@')) {
      setFormError((prev) => ({
        ...prev,
        email: 'El correo es inválido. ejemplo@gmail.com',
      }));
      return;
    }

    if (!password) {
      setFormError((prev) => ({
        ...prev,
        password: 'La contraseña es obligatoria.',
      }));
      return;
    }

    if (password !== confirmPassword) {
      setFormError((prev) => ({
        ...prev,
        confirmPassword: 'Las contraseñas no coinciden.',
      }));
      return;
    }

    dispatch(handleRegister({ email, password }));
  };

  useEffect(() => {
    if (token) {
      localStorage.setItem('authToken', token);
      navigate('/home');
    }
  }, [token, user, navigate]);

  useEffect(() => {
    if (error) {
      setAlertVisible(true);
      setTimeout(() => {
        setAlertVisible(false);
      }, 5000);
    }
  }, [error]);

  return (
    <section className="container mx-auto py-8 relative">
      {error ? (
        <AlertComponent
          kind="danger"
          message={'No fue posible crear el usuario'}
          title="Error"
          visible={alertVisible}
        />
      ) : (
        <AlertComponent
          kind="success"
          message={'Usuario creado'}
          title="Aviso"
          visible={alertVisible}
        />
      )}

      <article className="grid lg:grid-cols-6 gap-4 h-full">
        <div className="col-start-2 col-span-4 flex items-center justify-center">
          <form
            onSubmit={handleSubmit}
            className="bg-white p-6 lg:p-10 shadow-md rounded max-w-md w-full"
          >
            <h2 className="text-2xl lg:text-6xl font-bold mb-4 lg:mb-6 text-center">
              Registrarse
            </h2>

            <div className="mb-6">
              <label htmlFor="email" className="block text-gray-700">
                Correo
              </label>
              <input
                type="text"
                id="email"
                className="border border-gray-300 p-2 w-full rounded"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {formError.email && (
                <p className="mt-2 text-xs text-red-600">
                  <span className="font-medium">{formError.email}</span>
                </p>
              )}
            </div>

            <div className="mb-6">
              <label htmlFor="password" className="block text-gray-700">
                Contraseña
              </label>
              <input
                type="password"
                id="password"
                className="border border-gray-300 p-2 w-full rounded"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {formError.password && (
                <p className="mt-2 text-xs text-red-600">
                  <span className="font-medium">{formError.password}</span>
                </p>
              )}
            </div>

            <div className="mb-6">
              <label htmlFor="confirmPassword" className="block text-gray-700">
                Confirmar Contraseña
              </label>
              <input
                type="password"
                id="confirmPassword"
                className="border border-gray-300 p-2 w-full rounded"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              {formError.confirmPassword && (
                <p className="mt-2 text-xs text-red-600">
                  <span className="font-medium">
                    {formError.confirmPassword}
                  </span>
                </p>
              )}
            </div>

            <div className="flex justify-content-center flex-col">
              <button
                type="submit"
                className="bg-primary hover:bg-primary-dark text-white py-2 px-4 mb-4 rounded-lg  text-center transition"
              >
                {authLoading && (
                  <svg
                    aria-hidden="true"
                    role="status"
                    className="inline w-4 h-4 me-3 text-white animate-spin"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="#E5E7EB"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentColor"
                    />
                  </svg>
                )}{' '}
                Registrarme
              </button>
              <Link
                to={'/'}
                className="bg-transparent border-2 border-secondary text-secondary py-2 px-4 rounded-lg text-center hover:bg-secondary hover:text-white transition"
              >
                Volver
              </Link>
            </div>
          </form>
        </div>
      </article>
    </section>
  );
};

export default RegisterScreen;
