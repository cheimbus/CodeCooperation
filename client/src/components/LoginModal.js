import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { LOG_IN } from "../reducer/userInfoReducer";
import { useHistory, Link } from "react-router-dom";
import { FaUserAlt, FaLock } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { RiKakaoTalkFill } from "react-icons/ri";
import GoogleImg from "../images/Googleimg.png";
import KakaoImg from "../images/Kakaoimg.png";
const KAKAO_ID = `${process.env.KAKAO_ID}`;
const REDIRECT_URI = `${process.env.BASIC_URL}/oauth/callback/kakao`;

const GOGLE_ID = `${process.env.GOOGLE_ID}`;
const GOGLE_URL = `${process.env.BASIC_URL}/oauth/callback/google`;

export const GOGLE_AUTH_URL = `https://accounts.google.com/o/oauth2/auth?client_id=${GOGLE_ID}&access_type=offline&redirect_uri=${GOGLE_URL}&response_type=code&scope=https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email`;
export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;

function LoginModal({ handleLoginModal, setShowModal }) {
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState("");

  const history = useHistory();
  const dispatch = useDispatch();

  const handleInputValue = (key) => (e) => {
    setLoginInfo({ ...loginInfo, [key]: e.target.value });
  };
  const axios_Login = (userEmail, userPassword) => {
    return axios.post(
      `${process.env.SERVER.URL}/signin`,
      {
        email: userEmail,
        password: userPassword,
      },
      {
        withCredentials: true,
      }
    );
  };

  const handleLogin = () => {
    if (!loginInfo.email || !loginInfo.password) {
      setErrorMessage("아이디와 비밀번호를 모두 입력 해주세요");
      return;
    }
    return axios_Login(loginInfo.email, loginInfo.password)
      .then((res) => {
        console.log("받은데이터유저", res);
        const { id, nickname, loginType } = res.data.user;
        const accessToken = res.data.accessToken;
        dispatch(
          LOG_IN({
            id,
            nickname,
            accessToken,
            loginType,
          })
        );
        setShowModal(false);
        history.push("/");
      })
      .catch(() => {
        setErrorMessage("아이디 또는 비밀번호가 맞지않습니다");
      });
  };
  return (
    <div>
      <BackDrop>
        <PopUp>
          <CancelButtonBox>
            <CancelButton onClick={handleLoginModal}>✖</CancelButton>
          </CancelButtonBox>
          <H1Box>
            <H1Text>로그인</H1Text>
          </H1Box>
          <IdBox>아이디</IdBox>
          <InputBox>
            <Input
              type="text"
              onChange={handleInputValue("email")}
              placeholder="아이디를 입력해 주세요."
            ></Input>
          </InputBox>
          <IdBox>비밀번호</IdBox>
          <InputBox>
            <Input
              type="password"
              placeholder="패스워드를 입력해 주세요."
              onChange={handleInputValue("password")}
            ></Input>
          </InputBox>
          <ErrorBox>{errorMessage ? <div>{errorMessage}</div> : null}</ErrorBox>
          <LoginButtonBox>
            <LoginButton
              className="btn btn-login"
              type="submit"
              onClick={handleLogin}
            >
              로그인
            </LoginButton>
          </LoginButtonBox>
          <SignUpButtonBox>
            <SignUpButton>
              <Link to="/signup" onClick={handleLoginModal}>
                회원가입
              </Link>
            </SignUpButton>
          </SignUpButtonBox>
          <GoogleBox>
            <a href={GOGLE_AUTH_URL}>
              <Google />
            </a>
          </GoogleBox>
          <KakaoBox>
            <a href={KAKAO_AUTH_URL}>
              <Kakao />
            </a>
          </KakaoBox>
        </PopUp>
      </BackDrop>
    </div>
  );
}

export default LoginModal;

const BackDrop = styled.div`
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 2;
`;

const PopUp = styled.div`
  position: fixed;
  width: 23%;
  height: 68%;
  border-radius: 10px;
  display: flex;
  /* align-items: center; */
  flex-direction: column;
  background-color: white;
  box-shadow: 5px 10px 10px 1px rgba(0, 0, 0, 0.3);
  z-index: 3;
  text-align: center;
`;

const CancelButtonBox = styled.div`
  width: 100%;
  height: 5%;
  /* border: 1px solid lightgray; */
  margin-left: auto;
`;

const LoginButtonBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 8%;
  /* border: 1px solid lightgray; */
`;

const LoginButton = styled.button`
  border: 0;
  outline: 0;
  width: 50%;
  height: 90%;
  border-radius: 3rem;
  color: white;
  font-family: "Noto Sans KR";
  font-weight: 800;
  cursor: pointer;
  background-color: white;
  border: 2px solid #4c5175;
  color: #4c5175;
  /* &:hover {
    background-color: #4c5175;
    color: white;
  } */
`;

const SignUpButtonBox = styled.div`
  margin-top: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 8%;
  /* border: 1px solid lightgray; */
`;

const SignUpButton = styled.button`
  border: 0;
  outline: 0;
  font-family: "Noto Sans KR";
  font-weight: 800;
  width: 50%;
  height: 90%;
  border-radius: 3rem;
  color: white;
  cursor: pointer;
  background-color: white;
  border: 2px solid #4c5175;
  color: #4c5175;
  a {
    text-decoration: none;
    color: #4c5175;
  }
  a:visited {
    text-decoration: none;
  }
  a:hover {
    text-decoration: none;
  }
  a:focus {
    text-decoration: none;
  }

  a:active {
    text-decoration: none;
  }
`;

const CancelButton = styled.button`
  float: right;
  font-size: 1.3rem;
  margin: 5px 10px 0 0;
  border: 0;
  outline: 0;
  background-color: white;
  color: #4c5175;
  cursor: pointer;
`;

const H1Box = styled.div`
  margin-top: 1rem;
  width: 100%;
  height: 10%;
  /* border: 1px solid lightgray; */
`;

const H1Text = styled.div`
  font-family: "Noto Sans KR";
  font-size: 1.8rem;
  font-weight: 800;
  line-height: 3rem;
  color: #4c5175;
`;

const InputBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 9%;
  /* padding: 0 0 0 15px;
  border: 1px solid lightgray; */

  /* margin-right: auto; */
`;

const Input = styled.input`
  font-size: 1rem;
  width: 90%;
  height: 90%;
  border-radius: 0.8rem;
  border: 2px solid lightgray;
  padding: 0 0 0 10px;
  &:focus {
    border: 0;
    outline: 2px solid #4c5175;
  }
`;

const IdBox = styled.div`
  display: flex;
  align-items: center;
  font-family: "Noto Sans KR";
  font-size: 1.2rem;
  font-weight: 800;
  /* line-height: 3rem; */
  color: #4c5175;
  width: 100%;
  height: 8%;
  /* border: 1px solid lightgray; */
  text-align: left;
  padding: 0 0 0 20px;
`;

const ErrorBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: "Noto Sans KR";
  font-size: 1rem;
  font-weight: 800;
  /* line-height: 3rem; */
  color: #4c5175;
  width: 100%;
  height: 7%;
  /* border: 1px solid lightgray; */
  text-align: center;
  /* padding: 0 0 0 20px; */
`;

const GoogleBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 9%;
  /* border: 1px solid lightgray; */
`;

const KakaoBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 9%;
  /* border: 1px solid lightgray; */
`;
const Google = styled.img.attrs({
  src: `${GoogleImg}`,
})`
  width: 190px;
  height: 43px;
`;
const Kakao = styled.img.attrs({
  src: `${KakaoImg}`,
})`
  width: 180px;
  height: 45px;
`;