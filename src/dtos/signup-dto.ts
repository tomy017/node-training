import * as yup from "yup";

export default yup.object().shape({
  firstname: yup.string().trim().required("Firstname is a required field").max(50, "Firstname can't contain more than 50 characters"),
  lastname: yup.string().trim().required("Lastname is a required field").max(50, "Lastname can't contain more than 50 characters"),
  email: yup.string().email().required("Email is a required field"),
  password: yup.string().required("Password is a required field"),
});
