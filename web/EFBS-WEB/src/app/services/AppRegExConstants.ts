
export abstract class AppRegExConstants {

      //  Specific Field Related Regex
      static readonly EMAIL = '^(([\\w-]+\\.)+[\\w-]+|([a-zA-Z]{1}|[\\w-]{2,}))@'
      + '((([0-1]?[0-9]{1,2}|25[0-5]|2[0-4][0-9])\\.([0-1]?[0-9]{1,2}|25[0-5]|2[0-4][0-9])\\.'
      + '([0-1]?[0-9]{1,2}|25[0-5]|2[0-4][0-9])\\.([0-1]?[0-9]{1,2}|25[0-5]|2[0-4][0-9])){1}|'
      + '([a-zA-Z0-9]+[\\w-]+\\.)+[a-zA-Z]{1}[a-zA-Z0-9-]{1,23})$';

      static readonly PASSWORD = '((?=.*[a-zA-Z])(?=.*[\\d!"#$%&\'()*+,-./:;<=>?@\\[\\]^_`{|}~]).{8,32})';

      static readonly GROUP_NAME = '^[A-Za-z0-9\\-_ ]*$';

      static readonly CONTACT_NUMBER = '^[+][1-9][0-9]{11}$';

      static readonly TEN_DIGIT_CONTACT_NUMBER = '^[1-9][0-9]{9,12}';

      static readonly INTERNATIONAL_PHONE_NUMBERS = "^\\+(?:[0-9] ?){6,14}[0-9]$";

      static readonly ALPHABETS = '^[A-Za-z]*$';

      static readonly ALPHABETS_WITH_SPACE = '^[a-zA-Z_ ]*$';

      static readonly ALPHABETS_DIGITS_ONLY = '^[A-Za-z0-9]*$';

      static readonly DIGITS = '^[0-9]*$';
}
