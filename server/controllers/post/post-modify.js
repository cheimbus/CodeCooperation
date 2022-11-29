const { post } = require("../../models");

module.exports = {
  postmodify: async (req, res) => {
    const { id } = req.params;
    const {
      userId,
      postTitle,
      content,
      startDate,
      endDate,
      totalMember,
      openURL,
      postStack,
    } = req.body;
    if (!id) {
      return res.status(400).send({ message: "해당하는 id값이 없음" });
    } else {
      await post.update(
        {
          user_id: userId,
          title: postTitle,
          start_date: startDate,
          end_date: endDate,
          stack: postStack,
          content: content,
          total_member: totalMember,
          current_member: "1",
          project_status: true,
          url: openURL,
          created_at: new Date(),
          updated_at: new Date(),
        },
        { where: { id } }
      );
      return res.status(200).send({ message: "포스트 수정" });
    }
  },
};
