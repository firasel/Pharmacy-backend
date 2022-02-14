const ClearCookies = async (res) => {
  res.clearCookie("Auth_token", "/");
};

module.exports = ClearCookies;
