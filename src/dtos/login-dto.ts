import * as yup from "yup";

module.exports = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
});
