const jsonServer = require("json-server");
const fs = require("fs");
const path = require("path");
const middleWare = jsonServer.defaults();
const pause = require('connect-pause');
const API_PREFIX = "/api";
const DB_FILENAME = "db.json";

const DB_JSON_PATH = path.join(__dirname, "mock_data", DB_FILENAME);

const server = jsonServer.create();
const router = jsonServer.router(DB_JSON_PATH);


const REQUIRED_FIELDS_POST = ["title", "description"];

const getErrorResponse = (error: any) => ({ error });

const port = 3000;
const delay = 500;

server.use(pause(delay));
server.use(middleWare);
server.use(jsonServer.bodyParser);

server.use((req: any, res: any, next: any) => {
  // Validate on comment creation
  if (req.method === "POST" && req.originalUrl === "/api/posts") {
    const invalidFields = REQUIRED_FIELDS_POST.filter(field => {
      return req.body[field] === undefined;
    });

    if (invalidFields.length > 0) {
      const invalidFieldsStr = invalidFields
        .map(field => `"${field}"`)
        .join(", ");
      return res
        .status(400)
        .send(
          getErrorResponse(
            `Missing the following required fields: [${invalidFieldsStr}]`
          )
        );
    }
  }
  next();
});


server.use(API_PREFIX, router);
server.listen(port, () => {
  console.info(`[MOCK-SERVER] running on port ${port}`);
});
