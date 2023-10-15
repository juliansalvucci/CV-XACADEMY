const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { SERVER_SECRET } = require("../middleware/auth-mdw");
const { userService, resumeService } = require("../services");

router.post("/", async (req, res) => {
  const { user, password } = req.body;
  const userFound = await userService.validateUser({ user, password });
  if (userFound) {
    const userId = await userService.getUserId({ user });
    const lastResumeId = await resumeService.getMaxResumeIdByUserId(userId);
    const token = jwt.sign({ user }, SERVER_SECRET, {
      expiresIn: "50m",
    });
    return res.json({ token, userId, lastResumeId });
  }
  res.status(401).json({ error: "Invalid User" });
});

module.exports = router;
