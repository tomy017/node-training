import { UserModel } from "./user-model";

type LoginModel = Pick<UserModel, "email" | "password">;

export { LoginModel };
