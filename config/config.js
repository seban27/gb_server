var config = {};

config.messages = {
  success: 'Success. Nothing went wrong.',
  error: 'Sorry , Something went wrong. Please try again.',
  fieldMissing: 'Sorry, Required fields are missing.',
  authFailure: 'Sorry, You are not allowed to perform this action.',
  signupSuccess: 'Successfully signed up. Please login to continue.',
  emailAlreadyExists: 'Sorry, This email already in use.',
  loginError: 'Sorry, Your username or password is incorrect.',
  employeeIdAlreadyExists: 'Sorry, This employee already exists.',
};

config.auth = {
  jwtExpiration: '1d',
};

config.status = {
  status: 'active',
};

module.exports = config;
