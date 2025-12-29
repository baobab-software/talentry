// user.routes.ts
import { RequestHandler, Router } from "express";
import { userController } from "@/controllers";
import { authorizationMiddleware } from "@/middlewares";
import { $Enums } from "@/generated/prisma";

export class UserRoutes {
  constructor(private readonly router: Router = Router()) {}

  public init(): Router {
    // ========== PUBLIC PROFILE ENDPOINTS ==========
    this.router.get(
      "/profile",
      authorizationMiddleware.isAuthorized([
        $Enums.UserRole.ADMIN,
        $Enums.UserRole.SEEKER,
        $Enums.UserRole.COMPANY,
      ]) as RequestHandler,
      userController.getUser as RequestHandler
    );

    this.router.put(
      "/profile",
      authorizationMiddleware.isAuthorized([
        $Enums.UserRole.ADMIN,
        $Enums.UserRole.SEEKER,
        $Enums.UserRole.COMPANY,
      ]) as RequestHandler,
      userController.updateUser as RequestHandler
    );

    this.router.delete(
      "/profile",
      authorizationMiddleware.isAuthorized([
        $Enums.UserRole.ADMIN,
        $Enums.UserRole.SEEKER,
        $Enums.UserRole.COMPANY,
      ]) as RequestHandler,
      userController.deleteUser as RequestHandler
    );

    // ========== ADMIN-ONLY ENDPOINTS ==========
    this.router.get(
      "/:id",
      authorizationMiddleware.isAuthorized([
        $Enums.UserRole.ADMIN,
      ]) as RequestHandler,
      userController.getUser as RequestHandler
    );

    this.router.get(
      "/",
      authorizationMiddleware.isAuthorized([
        $Enums.UserRole.ADMIN,
      ]) as RequestHandler,
      userController.getUsers as RequestHandler
    );

    this.router.put(
      "/:id",
      authorizationMiddleware.isAuthorized([
        $Enums.UserRole.ADMIN,
      ]) as RequestHandler,
      userController.updateUser as RequestHandler
    );

    this.router.delete(
      "/:id",
      authorizationMiddleware.isAuthorized([
        $Enums.UserRole.ADMIN,
      ]) as RequestHandler,
      userController.deleteUser as RequestHandler
    );

    return this.router;
  }
}
