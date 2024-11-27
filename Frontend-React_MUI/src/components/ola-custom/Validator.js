import validator from 'validator';

function validNumber(value) {
  return !validator.isNumeric(value) ? true : false;
}

function validIdCard(value) {
  return !validator.isIdentityCard(value, 'TH') ? true : false;
}

function validCharator(value) {
  return !validator.isAlpha(value, 'th-TH') ? true : false;
}

function validMobileNo(value) {
  return !validator.isMobilePhone(value, 'th-TH') ? true : false;
}

function validEmail(value) {
  return !validator.isEmail(value) ? true : false;
}

export default {
  validNumber,
  validIdCard,
  validCharator,
  validMobileNo,
  validEmail,
};
