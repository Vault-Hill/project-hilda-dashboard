import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Ethereum } from '@thirdweb-dev/chains';
import { ThirdwebProvider } from '@thirdweb-dev/react';
import { Suspense, useState } from 'react';
import { RouterProvider } from 'react-router-dom';
import { AuthContext } from './contexts/auth.context';
import { useStorage } from './hooks/useStorage';
import router from './router';
import Loader from './components/Loader';

const queryClient = new QueryClient();

function App() {
  const { getItem } = useStorage('session');
const authState = getItem('auth');
  const [isAuth] = useState(!!authState);

  return (
    <QueryClientProvider client={queryClient}>
      <AuthContext.Provider value={isAuth}>
        <ThirdwebProvider activeChain={Ethereum} clientId={import.meta.env.VITE_CLIENT_ID}>
          <Suspense fallback={<Loader/>}>
            <RouterProvider router={router} />
          </Suspense>
        </ThirdwebProvider>
      </AuthContext.Provider>
    </QueryClientProvider>
  );
}

export default App;
