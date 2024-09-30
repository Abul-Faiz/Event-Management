const generateTimes = (startTime = new Date()) => {
  const start = new Date(startTime);
  const end = new Date(start);
  end.setHours(start.getHours() + 8);
  return {
    startTime: start.toISOString(),
    endTime: end.toISOString(),
  };
};

module.exports = { generateTimes };
