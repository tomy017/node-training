import { User } from "@prisma/client";

type SignupResponseModel = {
  firstname: string;
  lastname: string;
  email: string;
};

function createSignupResponseModel(data: User) {
  const response: SignupResponseModel = {
    firstname: data.firstname,
    lastname: data.lastname,
    email: data.email,
  };
  return response;
}

export { SignupResponseModel, createSignupResponseModel };
