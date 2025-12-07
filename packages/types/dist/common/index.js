'use strict';

// src/common/enums.ts
var HttpStatus = /* @__PURE__ */ ((HttpStatus2) => {
  HttpStatus2[HttpStatus2["OK"] = 200] = "OK";
  HttpStatus2[HttpStatus2["CREATED"] = 201] = "CREATED";
  HttpStatus2[HttpStatus2["ACCEPTED"] = 202] = "ACCEPTED";
  HttpStatus2[HttpStatus2["NO_CONTENT"] = 204] = "NO_CONTENT";
  HttpStatus2[HttpStatus2["BAD_REQUEST"] = 400] = "BAD_REQUEST";
  HttpStatus2[HttpStatus2["UNAUTHORIZED"] = 401] = "UNAUTHORIZED";
  HttpStatus2[HttpStatus2["FORBIDDEN"] = 403] = "FORBIDDEN";
  HttpStatus2[HttpStatus2["NOT_FOUND"] = 404] = "NOT_FOUND";
  HttpStatus2[HttpStatus2["CONFLICT"] = 409] = "CONFLICT";
  HttpStatus2[HttpStatus2["UNPROCESSABLE_ENTITY"] = 422] = "UNPROCESSABLE_ENTITY";
  HttpStatus2[HttpStatus2["TOO_MANY_REQUESTS"] = 429] = "TOO_MANY_REQUESTS";
  HttpStatus2[HttpStatus2["INTERNAL_SERVER_ERROR"] = 500] = "INTERNAL_SERVER_ERROR";
  HttpStatus2[HttpStatus2["SERVICE_UNAVAILABLE"] = 503] = "SERVICE_UNAVAILABLE";
  return HttpStatus2;
})(HttpStatus || {});
var Environment = /* @__PURE__ */ ((Environment2) => {
  Environment2["DEVELOPMENT"] = "development";
  Environment2["STAGING"] = "staging";
  Environment2["PRODUCTION"] = "production";
  Environment2["TEST"] = "test";
  return Environment2;
})(Environment || {});
var SortOrder = /* @__PURE__ */ ((SortOrder2) => {
  SortOrder2["ASC"] = "asc";
  SortOrder2["DESC"] = "desc";
  return SortOrder2;
})(SortOrder || {});

exports.Environment = Environment;
exports.HttpStatus = HttpStatus;
exports.SortOrder = SortOrder;
//# sourceMappingURL=index.js.map
//# sourceMappingURL=index.js.map