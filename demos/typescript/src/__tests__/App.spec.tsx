import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { ROUTES } from '../constants';
import Login from '../pages/Login';
import Home from '../pages/Home';
import Error from '../pages/Error';
import Callback from '../pages/Callback';
import NotFound from '../pages/NotFound';

function renderWithFullRouter(initialEntries: string[] = [ROUTES.LOGIN]) {
  return render(
    <MemoryRouter initialEntries={initialEntries}>
      <Routes>
        <Route path={ROUTES.LOGIN} element={<Login />} />
        <Route path={ROUTES.HOME} element={<Home />} />
        <Route path={ROUTES.ERROR} element={<Error />} />
        <Route path={ROUTES.CALLBACK} element={<Callback />} />
        <Route path={ROUTES.NOT_FOUND} element={<NotFound />} />
      </Routes>
    </MemoryRouter>
  );
}

describe('App Routing', () => {
  it('should render correct pages for each route', () => {
    renderWithFullRouter();

    expect(screen.getByText('OAuth SDK')).toBeInTheDocument();

    renderWithFullRouter([ROUTES.HOME]);

    expect(screen.getByText('Hello, World!')).toBeInTheDocument();

    renderWithFullRouter([ROUTES.ERROR]);

    expect(screen.getByText('Error')).toBeInTheDocument();
    expect(screen.getByText('Something went wrong')).toBeInTheDocument();

    renderWithFullRouter(['/unknown']);

    expect(screen.getByText('404')).toBeInTheDocument();
    expect(screen.getByText('Page not found')).toBeInTheDocument();
  });
});
