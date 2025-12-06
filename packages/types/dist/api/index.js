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

exports.ApplicationStatus = ApplicationStatus;
exports.ExperienceLevel = ExperienceLevel;
exports.JobStatus = JobStatus;
exports.JobType = JobType;
exports.PERMISSIONS = PERMISSIONS;
exports.Role = Role;
exports.UserRole = Role;
//# sourceMappingURL=index.js.map
//# sourceMappingURL=index.js.map