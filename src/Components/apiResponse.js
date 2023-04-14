exports.successResponse = function (response, msg) {
  const resData = {
    status: 1,
    message: msg,
  };
  return response.status(200).json(resData);
};

exports.successResponseWithData = function (response, msg, data) {
  const resData = {
    status: 1,
    message: msg,
    data,
  };
  return response.status(200).json(resData);
};

module.exports.errorResponse = function (response, msg) {
  const resData = {
    status: 0,
    message: msg,
  };
  return response.status(500).json(resData);
};

module.exports.validationErrorWithData = function (response, msg, data) {
  const resData = {
    status: 0,
    message: msg,
    error: data,
  };
  return response.status(400).json(resData);
};

module.exports.unauthorizedResponse = function (response, msg) {
  const resData = {
    status: 0,
    message: msg,
    data: "",
  };
  return response.status(401).json(resData);
};

module.exports.forbiddenResponse = function (response, msg) {
  const resData = {
    status: 0,
    message: msg,
  };
  return response.status(403).json(resData);
};

module.exports.unauthorizedResponse = function (response, msg) {
  const resData = {
    status: 0,
    message: msg,
  };
  return response.status(501).json(resData);
};
