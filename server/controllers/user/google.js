const axios = require("axios");
const { user } = require("../../models");

module.exports = {
  getToken: async (req, res) => {
    const code = req.body.code;
    const client_id = `${process.env.GOOGLE_ID}`;
    const redirect_uri = `${process.env.BASIC_URL}/oauth/callback/google`;
    const client_secret = `${process.env.GOOGLE_SECRET_ID}`;
    const grant_type = "authorization_code";
    const URL = `https://www.googleapis.com/oauth2/v4/token`;

    const token = await axios.post(
      URL,
      {
        code,
        client_id,
        client_secret,
        redirect_uri,
        grant_type,
      },
      {
        "content-type": "application/x-www-form-urlencoded",
      }
    );

    res.send(token.data);
  },
  getUserInfo: async (req, res) => {
    try {
      const googleInfoURL = `https://www.googleapis.com/oauth2/v2/userinfo`;
      const accessToken = req.query.accessToken;
      const userInfo = await axios.get(googleInfoURL, {
        headers: {
          authorization: `Bearer ${accessToken}`,
        },
      });
      let email = userInfo.data.email;
      let nickname = userInfo.data.name;
      let password = userInfo.data.id + nickname;

      const result = await user.findOne({
        where: {
          email,
          password,
        },
      });
      if (result) {
        const userData = {
          id: result.id,
          email: email,
          nickname: nickname,
          accessToken: accessToken,
          loginType: "Social",
        };
        // delete result.dataValues.password;
        // const accessToken = generateAccessToken(result.dataValues);
        res
          // .cookie("accessToken", accessToken, {
          //   httpOnly: true,
          //   sameSite: "none",
          //   secure: true,
          //   maxAge: 60 * 60 * 24 * 1000,
          //   // domain: "art-ground.link",
          //   // path: "/",
          //   ovewrite: true,
          // })
          .status(200)
          .json({ user: userData });
      } else {
        await user.create({
          email: email,
          password: password,
          nickname: nickname,
        });

        const findUser = await user.findOne({
          where: { email, password },
        });

        const usersignupInfo = {
          id: findUser.id,
          email: findUser.email,
          nickname: findUser.nickname,
          accessToken: accessToken,
          loginType: "Social",
        };
        // const data = (await user.create(usersignupInfo)).dataValues;
        // await signUpCaching(data);
        return (
          res
            // .cookie("accessToken", generateAccessToken(data), {
            //   httpOnly: true,
            //   sameSite: "none",
            //   secure: true,
            //   maxAge: 60 * 60 * 24 * 1000,
            //   // domain: "art-ground.link",
            //   // path: "/",
            //   ovewrite: true,
            // })
            .status(201)
            .json({ user: usersignupInfo })
        );
      }
    } catch (error) {
      console.log(error, "에러입니다.");
    }
  },
};
