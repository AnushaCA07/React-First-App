import isEmpty from './isEmpty';

const matchRegexp = function (value, regexp) {
  return isEmpty(value) || regexp.test(value);
};

const TextValidation = (value, type) => {
  switch (type) {
    case 'emailaddress':
      return {
        isValid: /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/g.test(
          value
        ),
        error: 'Please enter a valid email address',
      };
    /// Skiping Email validation now
    case 'email':
      return {
        isValid: true,
        error: '',
      };
    case 'password':
      return {
        isValid: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,}$/.test(value),
        error:
          'Please enter a valid password with upper case ,lower case and a digit',
      };
    case 'name':
      return {
        isValid:
          matchRegexp(value, /^([A-Za-z\s])+(([\'\.\-]*)([a-zA-Z\s]*))*$/) ||
          /^[a-zA-Z0-9]+$/.test(value),
        error: 'Symbols like #,$ are not allowed',
      };
    case 'pwid':
      return {
        isValid: /^[a-zA-Z0-9]+$/.test(value),
        error: 'Contains only alphanumeric',
      };
    case 'npi':
      return {
        isValid: /^[0-9]+$/.test(value) && value.length == 10,
        error: 'Contains only 10 digit numbers',
      };
  }
};

export default TextValidation;
