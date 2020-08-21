import React, { } from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";

function LandingPage(props) {
  const onClickHandler = () => {
    axios.get("api/users/logout").then((response) => {
      console.log("response.data : ", response.data);
      if (response.data.success) {
        alert("로그아웃에 성공했습니다.");
        props.history.push("/login");
      } else {
        alert("로그아웃 하는데 실패 했습니다.");
      }
    });
  };

  const onLogin = () => {
    props.history.push("/login");
  };

  const onRegister = () => {
    props.history.push("/register");
  };

  // const onMyPage = () => {
  //   props.history.push("/mypage");
  // };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100vh",
      }}
    >
      <span>
        <h2>LandingPage</h2>
        <button onClick={onRegister}>회원가입</button> <br />
        <button onClick={onLogin}>로그인</button> <br />
        <button onClick={onClickHandler}> 로그아웃 </button> <br />
        {/* <button onClick={onMyPage}> 회원수정 </button> */}
      </span>
    </div>
  );
}

export default withRouter(LandingPage);
