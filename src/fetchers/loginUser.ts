export const loginUser = async (data: { email: string; password: string }) => {
  const response = await fetch(`https://qj7oe1t9ek.execute-api.us-east-1.amazonaws.com/login`, {
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
