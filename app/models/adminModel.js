const { Tokonomics } = require("../schemas/tokonomics");
const sgMail = require("@sendgrid/mail");

const logger = require("../../logger");
const { env } = require("../../environment");

sgMail.setApiKey(env.SEND_GRID_KEY);

const tokonomic = async (token_name, token_supply) => {
  try {
    const data = await Tokonomics.create({
      token_name,
      token_supply,
    });
    // console.log(data, "data")
    if (!data) throw "not inserted";
    else return data;
  } catch (error) {
    logger.error(error);
    return { error };
  }
};

const getTokonomics = async () => {
  try {
    const data = await Tokonomics.find();
    if (!data) throw "not inserted";
    else return data;
  } catch (error) {
    logger.error(error);
    return {
      error: error,
    };
  }
};

const deleteTokomics = async (id) => {
  try {
    const data = await Tokonomics.findByIdAndDelete(id);

    if (!data) throw "not inserted";
    return data;
  } catch (error) {
    logger.error(error);
    return { error };
  }
};

const updateTokomics = async (id, token_name, token_supply) => {
  try {
    const updated = await Tokonomics.updateOne(
      { _id: id },
      {
        $set: {
          token_name,
          token_supply,
        },
      }
    );

    return updated;
  } catch (error) {
    logger.error(error);
    return { error: error };
  }
};

const UserFeedback = async (ctx) => {
  try {
    console.log("ctxxx", ctx.request.body);
    const { to, msg } = ctx.request.body;
    console.log("bodddyyyy", to, msg);
    const message = {
      to: to,
      from: env.OWNER_EMAIL,
      subject: "Feedback",
      body: msg,
      html: `<div>
      Your Query
        ${msg}
      </div> `,
    };
    let res = await sgMail.send(message);

    ctx.body = {
      status: true,
      message: "Email Send Successfully",
    };
  } catch (error) {
     
    ctx.body = {
      error: error,
    };
  }
};

module.exports = {
  deleteTokomics,
  updateTokomics,
  getTokonomics,
  tokonomic,
  UserFeedback,
};
