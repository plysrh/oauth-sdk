import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ROUTES } from './constants';
import Login from './pages/Login';
import Home from './pages/Home';
import Error from './pages/Error';
import NotFound from './pages/NotFound';

function App() {
  return (
    <Router>
      <Routes>
        <Route path={ROUTES.LOGIN} element={<Login />} />
        <Route path={ROUTES.HOME} element={<Home />} />
        <Route path={ROUTES.ERROR} element={<Error />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
