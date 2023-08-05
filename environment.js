const environment = {
  MONGOOSE_URL:
    process.env.MONGO_DB_KEY,
  ADMIN_TOKEN: "adminsecerest@key2login_secure",
  PROJECT_NAME: "abc",
  CMC_BASE_URL: process.env.CMC_BASE_URL,
  CMC_API_KEY: process.env.CMC_API_KEY,
  SEND_GRID_KEY: process.env.SEND_GRID_KEY,
  PORT: "8080",
  OWNER_EMAIL: process.env.OWNER_EMAIL,
};


module.exports = {
  env: environment,
};
