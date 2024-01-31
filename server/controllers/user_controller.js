const { ValidationError, ValidationLogicConflictError } = require("../libs/errors");
const { user_service } = require("../services");

exports.create_user = async (req, res) => {
  try {
    const response = await user_service.create_user(req, res);
    return res.status(201).json(response);
  } catch (error) {
    console.log("Error occured during creating user", error);
    if (error instanceof ValidationError) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: error.message });
      return;
    }
  }
};

exports.login_user = async (req, res) => {
  try {
    const response = await user_service.login_user(req, res);
    return res.status(200).json(response);
  } catch (error) {
    console.log("Error occured during login user", error);
    if (error instanceof ValidationLogicConflictError) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: error.message });
      return;
    }
  }
};

exports.get_sessions = async (req, res) => {
    try {
      const response = await user_service.get_sessions(req, res);
      return res.status(200).json(response);
    } catch (error) {
      console.log("Error occured during fetching sessions", error);
      if (error instanceof ValidationError) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(500).json({ error: error.message });
        return;
      }
    }
};

exports.logout_user = async (req, res) => {
  try {
    const response = await user_service.logout_user(req, res);
    return res.status(200).json(response);
  } catch (error) {
    console.log("Error occured during logging out user", error);
      res.status(500).json({ error: error.message });
      return;
  }
};