/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-prototype-builtins */
export const isJson = (value: string) => {
  try {
    const res = JSON.parse(value);
    return res;
  } catch (e) {
    return false;
  }
};

export const classNames = (...classes: string[]) => {
  return classes.filter(Boolean).join(' ');
};
