export const getDaysLeft = (date: number) => {
  return Math.floor(
    ((date || Date.now()) - Date.now()) / (1000 * 60 * 60 * 24)
  );
};
