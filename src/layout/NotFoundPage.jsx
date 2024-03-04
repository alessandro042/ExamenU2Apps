import React from 'react';

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold text-red-600 mb-4">404 - Página no encontrada</h1>
      <p className="text-lg text-gray-700">La página que estás buscando no existe.</p>
    </div>
  );
};

export default NotFoundPage;
