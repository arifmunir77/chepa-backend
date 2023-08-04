const { getCryptoCurrency } = require("./../utils/externalApiCalls");
const { objectToParams } = require("./../utils/common");
const logger = require("../../logger");

const GetCryptoCurrency = async (ctx) => {
  try {
    const url = `/v1/cryptocurrency/listings/latest`;
    const data = await getCryptoCurrency(url);

    if (data.error) throw data.error;

    ctx.body = {
      response: "success",
      data: data.data,
    };
  } catch (error) {
    logger.error({
      error,
      inputs: ctx.request.query,
    });
    ctx.status = 500;
    ctx.body = {
      response: "failure",
      error: error,
    };
  }
};

module.exports = {
  GetCryptoCurrency,
};
