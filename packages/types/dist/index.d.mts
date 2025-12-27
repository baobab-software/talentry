declare enum AdminType {
    SUPER_ADMIN = "SUPER_ADMIN",
    COMPANY_ADMIN = "COMPANY_ADMIN"
}

declare enum CompanyMemberRole {
    OWNER = "OWNER",
    ADMIN = "ADMIN",
    MANAGER = "MANAGER",
    MEMBER = "MEMBER",
    VIEWER = "VIEWER"
}
declare enum CompanyMemberStatus {
    ACTIVE = "ACTIVE",
    SUSPENDED = "SUSPENDED",
    INACTIVE = "INACTIVE"
}
declare enum JoinRequestStatus {
    PENDING = "PENDING",
    APPROVED = "APPROVED",
    REJECTED = "REJECTED",
    WITHDRAWN = "WITHDRAWN"
}

declare enum InvitationType {
    COMPANY_MEMBER = "COMPANY_MEMBER",
    ADMIN_USER = "ADMIN_USER"
}
declare enum InvitationStatus {
    PENDING = "PENDING",
    ACCEPTED = "ACCEPTED",
    DECLINED = "DECLINED",
    EXPIRED = "EXPIRED",
    CANCELLED = "CANCELLED",
    REVOKED = "REVOKED"
}

declare enum UserRole {
    ADMIN = "ADMIN",
    SEEKER = "SEEKER",
    EMPLOYER = "EMPLOYER"
}

interface JsonObject {
    [key: string]: any;
}
interface BaseEntity {
    id: string;
    createdAt: Date;
    updatedAt: Date;
}
interface BaseAudit {
    ipAddress?: string;
    userAgent?: string;
    metadata?: JsonObject;
    createdAt: Date;
}

interface Seeker extends BaseEntity {
    id: string;
    userId: string;
    user: User;
    firstName: string;
    lastName: string;
}

interface CompanyMember extends BaseEntity {
    id: string;
    companyId: string;
    company: Company;
    userId: string;
    user: User;
    role: CompanyMemberRole;
    department?: string;
    title?: string;
    permissions?: JsonObject;
    invitedById?: string;
    invitedBy?: User;
    invitedAt?: Date;
    joinedAt: Date;
    status: CompanyMemberStatus;
}

interface Invitation extends BaseEntity {
    id: string;
    type: InvitationType;
    companyId?: string;
    company?: Company;
    adminType?: AdminType;
    adminCompanyId?: string;
    inviterId: string;
    inviter: User;
    inviteeId?: string;
    invitee?: User;
    email: string;
    firstName?: string;
    lastName?: string;
    role?: string;
    permissions?: JsonObject;
    department?: string;
    title?: string;
    token: string;
    status: InvitationStatus;
    expiresAt: Date;
    message?: string;
    acceptedAt?: Date;
    declinedAt?: Date;
    revokedAt?: Date;
    ipAddress?: string;
    userAgent?: string;
    metadata?: JsonObject;
}
interface CompanyJoinRequest extends BaseEntity {
    id: string;
    companyId: string;
    company: Company;
    userId: string;
    user: User;
    message?: string;
    status: JoinRequestStatus;
    reviewedById?: string;
    reviewedBy?: User;
    reviewedAt?: Date;
}

interface CompanyMemberAudit extends BaseAudit {
    id: string;
    companyId?: string;
    company?: Company;
    memberId?: string;
    actorId: string;
    actor: User;
    actionType: string;
    targetType: string;
    targetId?: string;
    oldData?: JsonObject;
    newData?: JsonObject;
    changes?: JsonObject;
}

interface Company extends BaseEntity {
    id: string;
    userId: string;
    user: User;
    name: string;
    description?: string;
    website?: string;
    logo?: string;
    companyMembers?: CompanyMember[];
    invitations?: Invitation[];
    joinRequests?: CompanyJoinRequest[];
    auditLogs?: CompanyMemberAudit[];
}

interface User extends BaseEntity {
    id: string;
    avatar?: string;
    email: string;
    phone: string;
    image?: string;
    role: UserRole;
    password: string;
    admin?: Admin;
    seeker?: Seeker;
    company?: Company;
    companyMembers?: CompanyMember[];
    memberInvitations?: CompanyMember[];
    invitationsSent?: Invitation[];
    invitationsReceived?: Invitation[];
    joinRequests?: CompanyJoinRequest[];
    auditActions?: CompanyMemberAudit[];
    reviewsMade?: CompanyJoinRequest[];
    adminsInvited?: Admin[];
}

interface Admin extends BaseEntity {
    id: string;
    userId: string;
    user: User;
    firstName: string;
    lastName: string;
    type: AdminType;
    invitedById?: string;
    invitedBy?: User;
    invitedAt?: Date;
    permissions?: JsonObject;
}

interface LoginInput {
    email: string;
    password: string;
}
interface RegisterInput {
    email: string;
    password: string;
    phone: string;
    role: string;
    firstName?: string;
    lastName?: string;
    companyName?: string;
}
interface VerifyOtpInput {
    email: string;
    otp: string;
}
interface ResetPasswordInput {
    resetToken: string;
    newPassword: string;
}
interface AuthResponse {
    accessToken: string;
    refreshToken: string;
    user: User;
}

interface CreateAdminInput {
    email: string;
    firstName: string;
    lastName: string;
    password: string;
}
interface UpdateAdminInput {
    firstName?: string;
    lastName?: string;
    email?: string;
    isActive?: boolean;
}
interface AdminLoginInput {
    email: string;
    password: string;
}

interface CreateCompanyInput {
    userId: string;
    name: string;
    description?: string;
    website?: string;
    logo?: string;
}
interface UpdateCompanyInput {
    name?: string;
    description?: string;
    website?: string;
    logo?: string;
}

interface CreateInvitationInput {
    type: InvitationType;
    companyId?: string;
    adminType?: AdminType;
    adminCompanyId?: string;
    inviterId: string;
    inviteeId?: string;
    email: string;
    firstName?: string;
    lastName?: string;
    role?: string;
    permissions?: JsonObject;
    department?: string;
    title?: string;
    message?: string;
    ipAddress?: string;
    userAgent?: string;
    metadata?: JsonObject;
}
interface UpdateInvitationInput {
    status?: InvitationStatus;
    message?: string;
    acceptedAt?: Date;
    declinedAt?: Date;
    revokedAt?: Date;
}
interface CreateJoinRequestInput {
    companyId: string;
    userId: string;
    message?: string;
}

interface CreateMemberInput {
    userId: string;
    companyId: string;
    role: string;
}
interface UpdateMemberInput {
    role?: string;
    isActive?: boolean;
}
interface InviteMemberInput {
    email: string;
    companyId: string;
    role: string;
}

interface CreateSeekerInput {
    email: string;
    firstName: string;
    lastName: string;
    password: string;
    phone?: string;
}
interface UpdateSeekerInput {
    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: string;
    bio?: string;
    skills?: string[];
    experience?: string;
    education?: string;
    isActive?: boolean;
}
interface SeekerProfileInput {
    bio?: string;
    skills?: string[];
    experience?: string;
    education?: string;
    resumeUrl?: string;
}

interface CreateUserInput {
    email: string;
    phone: string;
    password: string;
    avatar?: string;
    image?: string;
    role?: UserRole;
}
interface UpdateUserInput {
    avatar?: string;
    email?: string;
    phone?: string;
    image?: string;
    role?: UserRole;
    password?: string;
}

interface CompanyFilter {
    id?: string;
    userId?: string;
    name?: string;
    search?: string;
    page?: number;
    limit?: number;
    sort?: {
        [key: string]: "asc" | "desc";
    };
    createdAt?: {
        gte?: Date;
        lte?: Date;
    };
}

interface InvitationFilter {
    id?: string;
    email?: string;
    companyId?: string;
    status?: string;
    invitedById?: string;
    createdAtFrom?: Date;
    createdAtTo?: Date;
    expiresAtFrom?: Date;
    expiresAtTo?: Date;
    search?: string;
}
interface InvitationSortOptions {
    field: 'createdAt' | 'expiresAt' | 'status';
    order: 'asc' | 'desc';
}
interface InvitationQueryOptions {
    filter?: InvitationFilter;
    sort?: InvitationSortOptions;
    limit?: number;
    offset?: number;
}

interface MemberFilter {
    id?: string;
    userId?: string;
    companyId?: string;
    role?: string;
    isActive?: boolean;
    joinedAtFrom?: Date;
    joinedAtTo?: Date;
    search?: string;
}
interface MemberSortOptions {
    field: "joinedAt" | "role" | "createdAt";
    order: "asc" | "desc";
}
interface MemberQueryOptions {
    filter?: MemberFilter;
    sort?: MemberSortOptions;
    limit?: number;
    offset?: number;
}

interface UserFilter {
    id?: string;
    role?: UserRole;
    email?: string;
    phone?: string;
    search?: string;
    page?: number;
    limit?: number;
    sort?: {
        [key: string]: "asc" | "desc";
    };
    createdAt?: {
        gte?: Date;
        lte?: Date;
    };
}

interface SeekerFilter {
    id?: string;
    userId?: string;
    firstName?: string;
    lastName?: string;
    search?: string;
    limit?: number;
    page?: number;
    sort?: "createdAt" | "firstName" | "lastName";
    createdAt?: {
        gte?: Date;
        lte?: Date;
    };
}

interface AdminFilter {
    id?: string;
    userId?: string;
    invitedById?: string;
    firstName?: string;
    lastName?: string;
    type?: string;
    permissions?: string[];
    search?: string;
    page?: number;
    limit?: number;
    sort?: {
        [key: string]: "asc" | "desc";
    };
    createdAt?: {
        gte?: Date;
        lte?: Date;
    };
}

type UserWithRelations = User & {
    admin?: Admin;
    seeker?: Seeker;
    company?: Company;
    companyMembers?: CompanyMember[];
};
type UserWithProfile = User & {
    admin?: Admin;
    seeker?: Seeker;
    company?: Company;
};

interface CompanyRelations {
    members?: unknown[];
    jobs?: unknown[];
    invitations?: unknown[];
    createdBy?: unknown;
}
interface CompanyWithRelations {
    id: string;
    name: string;
    description?: string;
    website?: string;
    industry?: string;
    size?: string;
    logo?: string;
    createdById: string;
    createdAt: Date;
    updatedAt: Date;
    members?: unknown[];
    jobs?: unknown[];
    invitations?: unknown[];
    createdBy?: unknown;
}

interface MemberRelations {
    user?: unknown;
    company?: unknown;
}
interface MemberWithRelations {
    id: string;
    userId: string;
    companyId: string;
    role: string;
    isActive: boolean;
    joinedAt: Date;
    createdAt: Date;
    updatedAt: Date;
    user?: unknown;
    company?: unknown;
}

export { type Admin, type AdminFilter, type AdminLoginInput, AdminType, type AuthResponse, type BaseAudit, type BaseEntity, type Company, type CompanyFilter, type CompanyJoinRequest, type CompanyMember, type CompanyMemberAudit, CompanyMemberRole, CompanyMemberStatus, type CompanyRelations, type CompanyWithRelations, type CreateAdminInput, type CreateCompanyInput, type CreateInvitationInput, type CreateJoinRequestInput, type CreateMemberInput, type CreateSeekerInput, type CreateUserInput, type Invitation, type InvitationFilter, type InvitationQueryOptions, type InvitationSortOptions, InvitationStatus, InvitationType, type InviteMemberInput, JoinRequestStatus, type JsonObject, type LoginInput, type MemberFilter, type MemberQueryOptions, type MemberRelations, type MemberSortOptions, type MemberWithRelations, type RegisterInput, type ResetPasswordInput, type Seeker, type SeekerFilter, type SeekerProfileInput, type UpdateAdminInput, type UpdateCompanyInput, type UpdateInvitationInput, type UpdateMemberInput, type UpdateSeekerInput, type UpdateUserInput, type User, type UserFilter, UserRole, type UserWithProfile, type UserWithRelations, type VerifyOtpInput };
