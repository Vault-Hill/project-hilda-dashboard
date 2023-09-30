export const isJson = (value: string) => {
  try {
    const res = JSON.parse(value);
    return res;
  } catch (e) {
    return false;
  }
};
