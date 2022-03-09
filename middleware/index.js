function appMiddlewareError(err) {
  console.error("Problem with starting HTTP server");
  console.error(err);
  process.exit(1);
}

module.exports = appMiddlewareError;
