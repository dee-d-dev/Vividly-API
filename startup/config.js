const config = require('config')

module.exports = function () {
  if (!config.get("jwtPrivateKey")) {
    console.error("FATAL ERROR: JWT not defined");
    process.exit(1);
  }
};
