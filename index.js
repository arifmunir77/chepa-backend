/*********** import starts ***********/
const http = require("http");
 
const { channel } = require("./app/socket.io");
require("dotenv").config();
("use strict");
const koa = require("koa");
const bodyParser = require("koa-bodyparser");
const cors = require("@koa/cors");
const { router } = require("./app/routes");
const { connectDB } = require("./app/utils/db");
const { env } = require("./environment");
const logger = require("./logger");
const swagger = require("swagger2");
const { ui, validate } = require("swagger2-koa");
 
const swaggerDocument = swagger.loadDocumentSync("./App/swagger/api.yaml");

const app = new koa();

connectDB();
app.use(cors());
app.use(bodyParser());
app.use(ui(swaggerDocument, "/api_docs"));
app.use(router.routes()).use(router.allowedMethods());



const server = app.listen(env.PORT, () =>
  logger.info(`Server has started. http://localhost:${env.PORT}`)
);
 
