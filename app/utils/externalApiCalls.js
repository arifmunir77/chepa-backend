const axios = require("axios");
const { env } = require("../../environment");
const logger = require("../../logger");

const getCryptoCurrency = async (url) => {
  try {
    const client = await axios({
      baseURL: env.CMC_BASE_URL,
      url,
      method: "GET",
      headers: { "X-CMC_PRO_API_KEY": env.CMC_API_KEY },
    });

    return client.data;
  } catch (error) {
    logger.error({
      error,
      inputs: url,
    });
    return {
      error: "Error Converting Price",
    };
  }
};

module.exports = {
  getCryptoCurrency,
};
