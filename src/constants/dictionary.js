const LOGIN_TERM = {
  LOGIN: 'Вход',
  FORGOT_PASSWORD: 'Forgot password?',
  DONT_HAVE: 'Don’t have an account?',
  REGISTER: 'Регистрация',
};

const SIGNUP_TERM = {
  SIGNUP: 'Sign up',
  NAME: 'Name',
  FIRST_NAME: 'First name',
  LAST_NAME: 'Last name',
  SIGNUP_SUCCESS: 'Congratulations! Registration was successful.',
  SIGNUP_EMAIL_FAIL: 'Email is already in use. Please, try another one or log in.',
  SIGN_UP_EMAIL_CHECK: 'Please check you email',
  SIGN_UP_PHONE: 'Phone',
};

const FORGOT_PASSWORD_TERM = {
  SUBMIT: 'Submit',
  RESET_PASS: 'Please enter email address\nto reset your password',
  FORGOT_PASS_TITLE: 'Forgot password',
  RESET_PASS_SENT: 'Check your email',
  NEW_PASSWORD: 'New password',
  CONFIRM_NEW_PASSWORD: 'Confirm new password',
  RESET_PASS_SUCCESS: 'Your password has been successfully changed',
};

const EMAIL_SENT_TERM = {
  BACK_TO_LOGIN: 'Back to login',
  EMAIL_SENT_TITLE: 'Email sent',
  RESET_PASS_SENT: 'A password reset email has\nbeen sent to your email',
};

const SHARED = {
  EMAIL: 'Email',
  CHANGE_PASSWORD: 'Change password',
  PASSWORD: 'Password',
  CONFIRM_PASSWORD: 'Confirm password',
  REMEMBER_ME: 'Remember me',
  REVIEWS: 'reviews',
  ARCHIVAL_DVD: 'Archival DVD Set',
  CONTINUE_SHOPPING: 'Continue shopping',
  SUBMIT_SUCCESS: 'Your message have been send',
  SUBSCRIBED: 'You’ve been subscribed',
  SUBSCRIBE_FAILED: 'Something went wrong, try again later',
  ALERT: 'Alert:',
};

const WIDGETS_TERMS = {
  TRUSTED_BY: 'Trust us. They do.',
  PROMO: 'Special Promotion',
  TEN_OFF: '10% off',
  PROMO_DESC:
    'Beautify your favorite photo and create a personalized work of art for you or your loved one.',
};

const BUTTON_NAMES = {
  LEARN_MORE: 'Learn more',
  UPDATE: 'Update',
  APPLY: 'Apply',
  HOME_PAGE: 'Go to Home Page',
};

const CONTACTS = {
  CONTACTS_TITLE: 'Have more questions? We can help.',
  EMAIL_CONTACTS: 'e: hello@memoya.com',
  PHONE: 'p: 888-298-7608',
  CALL_US: 'Call us at: ',
  SECOND_PHONE: '888-298-7608',
  WEEKDAY: 'Monday - Friday: 9AM - 6PM',
  HOLIDAYS: 'Saturday: 10AM - 4PM',
  CONTACTS_DESC: 'Or fill in the form.',
};

const COPYRIGHTS = {
  COPYRIGHT: 'Copyright © 2023. Ambiance City',
};

const DICTIONARY = {
  ...WIDGETS_TERMS,
  ...BUTTON_NAMES,
  ...LOGIN_TERM,
  ...SHARED,
  ...CONTACTS,
  ...COPYRIGHTS,
  ...SIGNUP_TERM,
  ...FORGOT_PASSWORD_TERM,
  ...EMAIL_SENT_TERM,
};

export default DICTIONARY;
