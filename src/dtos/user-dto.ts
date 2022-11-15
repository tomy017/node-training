const yup = require("yup");

module.exports = yup.object().shape({
  firstname: yup.string().trim().required("Please add firtname field"),
  lastname: yup.string().trim().required(),
  email: yup.string().email().required(),
  password: yup.string().required(),
});
