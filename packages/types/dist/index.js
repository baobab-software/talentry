'use strict';

// src/api/admin.types.ts
var PERMISSIONS = ["READ", "WRITE", "DELETE"];

// src/api/job.types.ts
var JobStatus = /* @__PURE__ */ ((JobStatus2) => {
  JobStatus2["DRAFT"] = "draft";
  JobStatus2["PUBLISHED"] = "published";
  JobStatus2["CLOSED"] = "closed";
  JobStatus2["ARCHIVED"] = "archived";
  return JobStatus2;
})(JobStatus || {});
var JobType = /* @__PURE__ */ ((JobType2) => {
  JobType2["FULL_TIME"] = "full-time";
  JobType2["PART_TIME"] = "part-time";
  JobType2["CONTRACT"] = "contract";
  JobType2["INTERNSHIP"] = "internship";
  JobType2["FREELANCE"] = "freelance";
  return JobType2;
})(JobType || {});
var ExperienceLevel = /* @__PURE__ */ ((ExperienceLevel2) => {
  ExperienceLevel2["ENTRY"] = "entry";
  ExperienceLevel2["MID"] = "mid";
  ExperienceLevel2["SENIOR"] = "senior";
  ExperienceLevel2["LEAD"] = "lead";
  ExperienceLevel2["EXECUTIVE"] = "executive";
  return ExperienceLevel2;
})(ExperienceLevel || {});
var ApplicationStatus = /* @__PURE__ */ ((ApplicationStatus2) => {
  ApplicationStatus2["PENDING"] = "pending";
  ApplicationStatus2["REVIEWING"] = "reviewing";
  ApplicationStatus2["SHORTLISTED"] = "shortlisted";
  ApplicationStatus2["INTERVIEWED"] = "interviewed";
  ApplicationStatus2["OFFERED"] = "offered";
  ApplicationStatus2["ACCEPTED"] = "accepted";
  ApplicationStatus2["REJECTED"] = "rejected";
  ApplicationStatus2["WITHDRAWN"] = "withdrawn";
  return ApplicationStatus2;
})(ApplicationStatus || {});

// src/api/user.types.ts
var Role = /* @__PURE__ */ ((Role2) => {
  Role2["ADMIN"] = "admin";
  Role2["CANDIDATE"] = "candidate";
  Role2["EMPLOYER"] = "employer";
  return Role2;
})(Role || {});

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

exports.ApplicationStatus = ApplicationStatus;
exports.Environment = Environment;
exports.ExperienceLevel = ExperienceLevel;
exports.HttpStatus = HttpStatus;
exports.JobStatus = JobStatus;
exports.JobType = JobType;
exports.PERMISSIONS = PERMISSIONS;
exports.Role = Role;
exports.SortOrder = SortOrder;
exports.UserRole = Role;
//# sourceMappingURL=index.js.map
//# sourceMappingURL=index.js.map