import { UserModel } from "../models/user-model";

type SignupResponseModel = Pick<UserModel, "firstname" | "lastname" | "email">;

function createSignupResponseModel(data: UserModel) {
  const response: SignupResponseModel = {
    firstname: data.firstname,
    lastname: data.lastname,
    email: data.email,
  };
  return response;
}

export { SignupResponseModel, createSignupResponseModel };
