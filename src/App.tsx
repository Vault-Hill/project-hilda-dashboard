import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Suspense, useState } from 'react';
import { RouterProvider } from 'react-router-dom';
import { AuthContext } from './contexts/auth.context';
import { useStorage } from './hooks/useStorage';
import router from './router';

const queryClient = new QueryClient();

function App() {
  const { getItem } = useStorage('session');
  const authState = getItem('auth');
  const [isAuth] = useState(!!authState);

  return (
    <QueryClientProvider client={queryClient}>
      <AuthContext.Provider value={isAuth}>
        <Suspense fallback={<div>Loading...</div>}>
          <RouterProvider router={router} />
        </Suspense>
      </AuthContext.Provider>
    </QueryClientProvider>
  );
}

export default App;
