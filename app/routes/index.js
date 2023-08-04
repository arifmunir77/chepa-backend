const koaRouter = require("koa-router");
const { validate } = require("../validations/emptyFieldValidate");
const { validateToken } = require("../validations/tokenValidate");

const {
  Tokonomics,
  DeleteTokomics,
  GetTokonomics,
  UpdateTokonomics,
} = require("../controllers/admin");
const { GetCryptoCurrency } = require("../controllers/convertedPrice");
const { addBlacklistToken } = require("../controllers/blacklistController");
const { UserFeedback } = require("../models/adminModel");
 

const router = new koaRouter();

//admin routes
router.post("/create-tokonomics", Tokonomics);

router.put("/update-tokonomics/:id", UpdateTokonomics);
router.delete("/delete-tokonomics/:id", DeleteTokomics);

router.get("/get-tokonomics", GetTokonomics);
router.get("/get-cryptocurrency", GetCryptoCurrency);
router.post("/leave-feedback", UserFeedback);


module.exports = { router };
