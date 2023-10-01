// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const onboarding = async ({token, ...data}: any) => {
  const response = await fetch(`${import.meta.env.VITE_BASE_URL}/onboarding`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  return result;
};
