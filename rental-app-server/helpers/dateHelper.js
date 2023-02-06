module.exports.getStartOfMonthDate = (date) => {
  return new Date(date.getFullYear(), date.getMonth(), 1);
};

module.exports.getEndOfMonthDate = (date) => {
  return new Date(date.getFullYear(), date.getMonth() + 1, 1);
};
