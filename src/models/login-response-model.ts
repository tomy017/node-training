import { User } from "@prisma/client";

type LoginResponseModel = {
  firstname: string;
  lastname: string;
  email: string;
  token: string;
};

function createLoginResponse(data: User, token: string) {
  const response: LoginResponseModel = {
    firstname: data.firstname,
    lastname: data.lastname,
    email: data.email,
    token,
  };
  return response;
}

export { LoginResponseModel, createLoginResponse };
