module.exports = function statusResponse(code, statusText, content) {
  return {
    code,
    statusText,
    content,
  };
};
