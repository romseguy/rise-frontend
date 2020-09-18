import CryptoJS from 'crypto-js'

export default function encodePassword(password, salt) {
  const salted = `${password}{${salt}}`;
  let encodedPassword = CryptoJS.SHA512(salted);

  for (let i = 1; i < 5000; i++) {
    encodedPassword = CryptoJS.SHA512(encodedPassword.concat(CryptoJS.enc.Utf8.parse(salted)));
  }

  return encodedPassword.toString(CryptoJS.enc.Base64);
}
