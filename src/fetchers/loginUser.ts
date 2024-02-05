export const loginUser = async (data: { email: string; password: string }) => {
  const response = await fetch(`${import.meta.env.VITE_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Credentials': 'true',
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  return result;
};
