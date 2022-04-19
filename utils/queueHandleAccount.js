const duration = 1000 * 30;
const handleAccount = require("../models/handleAccount");
const deleteAccount = function (email) {
  setTimeout(async () => {
    await handleAccount.findOneAndRemove({ email });
  }, duration);
};

module.exports = deleteAccount;
