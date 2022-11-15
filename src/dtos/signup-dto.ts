import * as yup from "yup";

module.exports = yup.object().shape({
  firstname: yup.string().trim().required(),
  lastname: yup.string().trim().required(),
  email: yup.string().email().required(),
  password: yup.string().required(),
});
