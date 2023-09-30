export const updateProfile = async (data: { knowledgeBase: string; token?: string }) => {
  const response = await fetch(`https://qj7oe1t9ek.execute-api.us-east-1.amazonaws.com/profile`, {
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
