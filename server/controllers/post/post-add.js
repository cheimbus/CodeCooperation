const { post } = require("../../models");

module.exports = {
  sendPost: async (req, res) => {
    const accessTokendata = req.headers["authorization"];
    const {
      userId,
      postTitle,
      content,
      startDate,
      endDate,
      totalMember,
      postStack,
    } = req.body;

    if (!accessTokendata) {
      res.status(401).send("invalid");
    } else {
      if (!userId) {
        res
          .status(422)
          .json({ data: null, message: "insufficient parameters supplied" });
      } else {
        post
          .create({
            user_id: userId,
            title: postTitle,
            start_date: startDate,
            end_date: endDate,
            stack: postStack,
            content: content,
            total_member: totalMember,
            current_member: "1",
            project_status: true,
            created_at: new Date(),
            updated_at: new Date(),
          })
          .then(() => {
            res.status(201).json({
              message: "ok",
            });
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
  },
};
