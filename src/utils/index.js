export const getFromLocalStorage = (name) => {
  const value = window.localStorage.getItem(name);
  return value ? value : null;
};

export const setToLocalStorage = (name, value) => {
  try {
    window.localStorage.setItem(name, value);
    return true;
  } catch {
    return false;
  }
};
