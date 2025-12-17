import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ROUTES, BACKEND_ENDPOINTS } from '../constants';

type Provider = 'github' | 'google';

export default function Callback() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const handleCallback = async () => {
      const code = searchParams.get('code');
      const provider = (searchParams.get('state') as Provider) || 'github';

      if (!code) {
        navigate(ROUTES.ERROR);

        return;
      }

      try {
        const response = await fetch(BACKEND_ENDPOINTS.OAUTH, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ provider, code }),
        });

        if (response.ok) {
          navigate(ROUTES.HOME);
        } else {
          navigate(ROUTES.ERROR);
        }
      } catch {
        navigate(ROUTES.ERROR);
      }
    };

    handleCallback();
  }, [navigate, searchParams]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">Authenticating...</p>
      </div>
    </div>
  );
}
