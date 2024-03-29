export const formatLocalDateTime = (date) => {
  if (date == null) {
    return "NULL";
  }
  return new Date(
    date[0],
    date[1] - 1,
    date[2],
    date[3],
    date[4],
    0,
    0
  ).toLocaleDateString();
};
