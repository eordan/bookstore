import React from 'react';
import { Navigate, Route, Routes } from 'react-router';
import { publicRoutes } from '../../routes';
import { RoutesEnum } from '../../utils/enums';

export function AppRouter(): JSX.Element {
  return (
    <Routes>
      {publicRoutes.map(({ path, Component }) => (
        <Route key={path} path={path} element={Component} />
      ))}
      <Route path="*" element={<Navigate replace to={RoutesEnum.PAGE_404} />} />
    </Routes>
  );
}
