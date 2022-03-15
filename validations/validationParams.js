const validationParams = {
  headingMinLength: 1,
  headingMaxLength: 255,
  contentMinLength: 1,
  contentMaxLength: 32768,
  userNameMinLength: 5,
  userNameMaxLength: 20,
  firstNameMinLength: 2,
  firstNameMaxLength: 20,
  lastNameMinLength: 2,
  lastNameMaxLength: 20,
  passwordRegex: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{3,25}$/,
};

module.exports = validationParams;
