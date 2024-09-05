import React, { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';

const MainLayout: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const date = new Date().getFullYear();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Header */}
      <nav className="bg-white border-gray-200 shadow-md mb-4">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4">
          <Link
            to={'/'}
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <span className="self-center text-2xl font-semibold whitespace-nowrap">
              Todo Jelou
            </span>
          </Link>
          <button
            type="button"
            onClick={toggleMenu}
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
            aria-controls="navbar-default"
            aria-expanded={isMenuOpen}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>

          <div
            className={`w-full md:block md:w-auto ${isMenuOpen ? 'block' : 'hidden'}`}
            id="navbar-default"
          >
            <ul className="font-medium flex flex-col sm:justify-center p-4 md:p-0 mt-4 border border-gray-100 rounded-lg  md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white">
              <li className="flex sm:py-4 md:py-1 justify-center">
                <Link
                  to={'/login'}
                  className="text-primary hover:text-primary-500 bg-transparent px-4 py-2 transition text-center"
                >
                  Iniciar sesión
                </Link>
              </li>
              <li className="flex sm:py-4 md:py-1 justify-center">
                <Link
                  to={'/register'}
                  className="bg-transparent border-2 border-secondary text-secondary py-2 px-4 rounded-lg text-center hover:bg-secondary hover:text-white transition"
                >
                  Registrarse
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      {/* Main Content */}
      <main className="flex-grow p-4">
        <Outlet />
      </main>

      {/* Footer */}

      <footer className="bg-white">
        <div className="mx-auto w-full max-w-screen-xl">
          <div className="px-4 py-6 justify-center text-center md:flex md:items-center md:justify-between">
            <span className="text-sm text-gray-500 dark:text-gray-300 sm:text-center">
              © {date}{' '}
              <a href="https://gioudi.github.io/portfolio/" target="_blank">
                Sergio Penagos
              </a>
              . Derechos reservados.
            </span>
            <div className="flex mt-4 justify-center md:mt-0 space-x-5 rtl:space-x-reverse">
              <a
                href="https://github.com/gioudi"
                target="_blank"
                className="text-gray-400 hover:text-gray-900"
              >
                <svg
                  className="w-4 h-4"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10 .333A9.911 9.911 0 0 0 6.866 19.65c.5.092.678-.215.678-.477 0-.237-.01-1.017-.014-1.845-2.757.6-3.338-1.169-3.338-1.169a2.627 2.627 0 0 0-1.1-1.451c-.9-.615.07-.6.07-.6a2.084 2.084 0 0 1 1.518 1.021 2.11 2.11 0 0 0 2.884.823c.044-.503.268-.973.63-1.325-2.2-.25-4.516-1.1-4.516-4.9A3.832 3.832 0 0 1 4.7 7.068a3.56 3.56 0 0 1 .095-2.623s.832-.266 2.726 1.016a9.409 9.409 0 0 1 4.962 0c1.89-1.282 2.717-1.016 2.717-1.016.366.83.402 1.768.1 2.623a3.827 3.827 0 0 1 1.02 2.659c0 3.807-2.319 4.644-4.525 4.889a2.366 2.366 0 0 1 .673 1.834c0 1.326-.012 2.394-.012 2.72 0 .263.18.572.681.475A9.911 9.911 0 0 0 10 .333Z"
                    clip-rule="evenodd"
                  />
                </svg>
                <span className="sr-only">GitHub account</span>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;
