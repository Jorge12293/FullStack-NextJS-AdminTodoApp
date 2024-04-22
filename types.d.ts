// nextauth.d.ts
import { DefaultSession, DefaultUser } from "next-auth";
import { JWT } from "next-auth/jwt"

interface IUser extends DefaultUser {
  /**
   * User roles
   */
  roles?: string[];
  id: string;
  /**
   * Add any other fields that you manage
   */
}

declare module "next-auth" {
  interface User extends IUser {}

  interface Session {
    user?: User;
  }
}

declare module "next-auth/jwt" {
  interface JWT extends IUser {}
}