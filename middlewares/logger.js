const logRequest = (req, res, next) => {
  const startTime = new Date();
  const timeStamp = startTime.toLocaleString();

  //after response is sent
  res.on("finish", () => {
    const endTime = new Date();
    const elapsedTime = endTime - startTime;
    console.log(
      `[${timeStamp}] | Method: ${req.method} | URL: ${req.url} | Time Taken: ${elapsedTime}ms`
    );
  });

  next();
};

module.exports = { logRequest };
