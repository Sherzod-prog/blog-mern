const bcrypt = require("bcrypt");

const hashString = async (userValue) => {
  const salt = await bcrypt.genSalt(10);
  const hashedpassword = await bcrypt.hash(userValue, salt);
  return hashedpassword;
};

const compareString = async (userPassword, password) => {
  try {
    const isMatch = await bcrypt.compare(userPassword, password);
    return isMatch;
  } catch (error) {
    console.log(error);
  }
};

const generateOTP = () => {
  const min = 100000;
  const max = 999999;
  let randomNumber = Math.floor(Math.random() * (max - min + 1) + min);
  return randomNumber;
};

module.exports = {
  hashString,
  compareString,
  generateOTP,
};
