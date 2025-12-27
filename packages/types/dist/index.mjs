// src/enums/admin.enum.ts
var AdminType = /* @__PURE__ */ ((AdminType2) => {
  AdminType2["SUPER_ADMIN"] = "SUPER_ADMIN";
  AdminType2["COMPANY_ADMIN"] = "COMPANY_ADMIN";
  return AdminType2;
})(AdminType || {});

// src/enums/company.enum.ts
var CompanyMemberRole = /* @__PURE__ */ ((CompanyMemberRole2) => {
  CompanyMemberRole2["OWNER"] = "OWNER";
  CompanyMemberRole2["ADMIN"] = "ADMIN";
  CompanyMemberRole2["MANAGER"] = "MANAGER";
  CompanyMemberRole2["MEMBER"] = "MEMBER";
  CompanyMemberRole2["VIEWER"] = "VIEWER";
  return CompanyMemberRole2;
})(CompanyMemberRole || {});
var CompanyMemberStatus = /* @__PURE__ */ ((CompanyMemberStatus2) => {
  CompanyMemberStatus2["ACTIVE"] = "ACTIVE";
  CompanyMemberStatus2["SUSPENDED"] = "SUSPENDED";
  CompanyMemberStatus2["INACTIVE"] = "INACTIVE";
  return CompanyMemberStatus2;
})(CompanyMemberStatus || {});
var JoinRequestStatus = /* @__PURE__ */ ((JoinRequestStatus2) => {
  JoinRequestStatus2["PENDING"] = "PENDING";
  JoinRequestStatus2["APPROVED"] = "APPROVED";
  JoinRequestStatus2["REJECTED"] = "REJECTED";
  JoinRequestStatus2["WITHDRAWN"] = "WITHDRAWN";
  return JoinRequestStatus2;
})(JoinRequestStatus || {});

// src/enums/invitation.enum.ts
var InvitationType = /* @__PURE__ */ ((InvitationType2) => {
  InvitationType2["COMPANY_MEMBER"] = "COMPANY_MEMBER";
  InvitationType2["ADMIN_USER"] = "ADMIN_USER";
  return InvitationType2;
})(InvitationType || {});
var InvitationStatus = /* @__PURE__ */ ((InvitationStatus2) => {
  InvitationStatus2["PENDING"] = "PENDING";
  InvitationStatus2["ACCEPTED"] = "ACCEPTED";
  InvitationStatus2["DECLINED"] = "DECLINED";
  InvitationStatus2["EXPIRED"] = "EXPIRED";
  InvitationStatus2["CANCELLED"] = "CANCELLED";
  InvitationStatus2["REVOKED"] = "REVOKED";
  return InvitationStatus2;
})(InvitationStatus || {});

// src/enums/user.enum.ts
var UserRole = /* @__PURE__ */ ((UserRole2) => {
  UserRole2["ADMIN"] = "ADMIN";
  UserRole2["SEEKER"] = "SEEKER";
  UserRole2["EMPLOYER"] = "EMPLOYER";
  return UserRole2;
})(UserRole || {});

export { AdminType, CompanyMemberRole, CompanyMemberStatus, InvitationStatus, InvitationType, JoinRequestStatus, UserRole };
//# sourceMappingURL=index.mjs.map
//# sourceMappingURL=index.mjs.map