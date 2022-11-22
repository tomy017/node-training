import { UserModel } from "./user-model";

type LoginResponseModel = Pick<UserModel, "firstname" | "lastname" | "email"> & { token: string }

function createLoginResponse(data: UserModel, token: string) {
  const response: LoginResponseModel = {
    firstname: data.firstname,
    lastname: data.lastname,
    email: data.email,
    token,
  };
  return response;
}

export { LoginResponseModel, createLoginResponse };
