import * as yup from "yup";

export default yup.object().shape({
  firstname: yup.string().trim().required(),
  lastname: yup.string().trim().required(),
  email: yup.string().email().required(),
  password: yup.string().required(),
});
