import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { AuthFlow, type Provider } from '@plysrh88/authflow';
import { ROUTES, AUTH_CONFIG } from '../constants';

const auth = new AuthFlow({
  github: {
    clientId: AUTH_CONFIG.GITHUB.CLIENT_ID,
    clientSecret: AUTH_CONFIG.GITHUB.CLIENT_SECRET,
    redirectUri: AUTH_CONFIG.GITHUB.REDIRECT_URI,
  },
  google: {
    clientId: AUTH_CONFIG.GOOGLE.CLIENT_ID,
    clientSecret: AUTH_CONFIG.GOOGLE.CLIENT_SECRET,
    redirectUri: AUTH_CONFIG.GOOGLE.REDIRECT_URI,
  },
});

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
        await auth.handleCallback(provider, code);
        navigate(ROUTES.HOME);
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