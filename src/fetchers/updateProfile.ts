export const updateProfile = async (data: { knowledgeBase: string; token?: string }) => {
  const response = await fetch(`${import.meta.env.VITE_BASE_URL}/profile`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Credentials': 'true',
      Authorization: `Bearer ${data.token}`,
    },
    body: JSON.stringify({ knowledgeBase: data.knowledgeBase }),
  });

  const result = await response.json();

  return result;
};
