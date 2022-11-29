const { user } = require("../../models");
const bcrypt = require("bcrypt");

module.exports = async (req, res) => {
  const { email, password, nickname } = req.body;
  if (!email || !password || !nickname) {
    res.status(422).send("insufficient parameters supplied");
  }
  const salt = 12;
  const hashed = await bcrypt.hash(password, salt);
  await user
    .findOrCreate({
      where: { email },
      defaults: {
        email,
        password: hashed,
        nickname,
      },
    })
    .then(([result, created]) => {
      if (created) {
        res.status(201).send({ message: "created!" });
      } else {
        res.status(409).send({ message: "email exist" });
      }
    });
};
