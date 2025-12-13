import { render } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import type { ReactElement } from 'react';
import { ROUTES } from './constants';
import Login from './pages/Login';
import Home from './pages/Home';
import Error from './pages/Error';
import NotFound from './pages/NotFound';

export const renderWithRouter = (component: ReactElement, initialEntries: string[] = [ROUTES.LOGIN]) => {
  return render(
    <MemoryRouter initialEntries={initialEntries}>
      {component}
    </MemoryRouter>
  );
};

export const renderWithFullRouter = (initialEntries: string[] = [ROUTES.LOGIN]) => {
  return render(
    <MemoryRouter initialEntries={initialEntries}>
      <Routes>
        <Route path={ROUTES.LOGIN} element={<Login />} />
        <Route path={ROUTES.HOME} element={<Home />} />
        <Route path={ROUTES.ERROR} element={<Error />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </MemoryRouter>
  );
};