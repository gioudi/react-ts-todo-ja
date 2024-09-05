import React from 'react';

type AlertType = 'danger' | 'success' | 'info';

interface AlertProps {
  message: string;
  title: string;
  kind: AlertType;
  visible: boolean;
}

const AlertComponent: React.FC<AlertProps> = ({
  title,
  message,
  kind,
  visible,
}) => {
  if (!visible) return null;
  const baseClasses =
    'flex items-center p-4 mb-4 text-sm border rounded-lg fixed top-5 right-5 z-50';
  const kindStyles = {
    danger:
      'text-red-800 border-red-300 bg-red-50 dark:bg-red-800 dark:text-red-400 dark:border-red-800',
    success:
      'text-green-800 border-green-300 bg-green-50 dark:bg-green-800 dark:text-green-400 dark:border-green-800',
    info: 'text-blue-800 border-blue-300 bg-blue-50 dark:bg-blue-800 dark:text-blue-400 dark:border-blue-800',
  };

  return (
    <div className={`${baseClasses} ${kindStyles[kind]}`} role="alert">
      <svg
        className="flex-shrink-0 inline w-4 h-4 me-3"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
      </svg>
      <span className="sr-only">
        {kind.charAt(0).toUpperCase() + kind.slice(1)}
      </span>
      <div>
        <span className="font-medium">{title}!</span> {message}.
      </div>
    </div>
  );
};

export default AlertComponent;
