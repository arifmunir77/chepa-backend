const { tokonomic, deleteTokomics, getTokonomics ,updateTokomics} = require("../models/adminModel");
const logger = require("../../logger");

const Tokonomics = async (ctx) => {
  try {
    logger.info({ login: ctx.body });
    const { token_name, token_supply } = ctx.request.body;
    console.log("token_name", token_name, token_supply);
    const result = await tokonomic(token_name, token_supply);
    if (result.error) throw result.error;
    ctx.body = {
      response: "success",
      data: result,
    };
  } catch (error) {
    logger.error(error);
    ctx.status = 500;
    ctx.body = {
      response: "failure",
      error: error,
    };
  }
};

const GetTokonomics = async (ctx) => {
  try {
    logger.info({ login: ctx.body });

    const result = await getTokonomics();
    console.log("ress",result);
    if (result.error) throw result.error;
    ctx.body = {
      response: "success",
      data: result,
    };
  } catch (error) {
    logger.error(error);
    ctx.status = 500;
    ctx.body = {
      response: "failure",
      error: error,
    };
  }
};

const UpdateTokonomics = async (ctx) => {
  try {
    logger.info({ login: ctx.body });
    const { token_name, token_supply } = ctx.request.body;
    const { id } = ctx.request.params;
   
    console.log("token_name", token_name, token_supply,id);

    const result = await updateTokomics(id, token_name, token_supply);
    console.log("ress",result)
    if (result.error) throw result.error;
    ctx.body = {
      response: "success",
      data: result,
    };
  } catch (error) {
    logger.error(error);
    ctx.status = 500;
    ctx.body = {
      response: "failure",
      error: error,
    };
  }
};

const DeleteTokomics = async (ctx) => {
  try {
    logger.info({ login: ctx.body });
    const { id } = ctx.request.params;

    const result = await deleteTokomics(id);
    if (result.error) throw result.error;
    ctx.body = {
      response: "success",
      data: result,
    };
  } catch (error) {
    logger.error(error);
    ctx.status = 500;
    ctx.body = {
      response: "failure",
      error: error,
    };
  }
};

module.exports = {
  Tokonomics,
  GetTokonomics,
  UpdateTokonomics,
  DeleteTokomics,
};
