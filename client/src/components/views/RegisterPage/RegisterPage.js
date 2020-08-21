import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { registerUser } from "../../../_actions/user_action";
import { loginUser } from "../../../_actions/user_action";

import { withRouter } from "react-router-dom";
//props.history withrouter를 이용한다.

//소셜회원가입 추가
import  GoogleLogin  from 'react-google-login';
import  KaKaoLogin  from 'react-kakao-login';
import FacebookLogin from 'react-facebook-login';
import styled from 'styled-components'

function RegisterPage(props) {
  //redux를 사용하기 위한 dispatch
  const dispatch = useDispatch();

  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [Name, setName] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");

  const onEmailHandler = (event) => {
    setEmail(event.currentTarget.value);
  };

  const onNameHandler = (event) => {
    setName(event.currentTarget.value);
  };

  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value);
  };

  const onConfirmPasswordHandler = (event) => {
    setConfirmPassword(event.currentTarget.value);
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();

    if (Password !== ConfirmPassword) {
      return alert("비밀번호와 비밀번호 확인은 같아야 합니다.");
    }

    let body = {
      email: Email,
      name: Name,
      password: Password,
    };
    dispatch(registerUser(body)).then((response) => {
      console.log("client 리스폰 ", response);
      console.log("clinet props", props);
      if (response.payload.success) {
        dispatch(loginUser(body)).then((response) => {
          console.log("client 리스폰 로그인 ", response);
          console.log("clinet props 로그인", props);
          console.log("페이로드로드로드", response.payload.loginSuccess);
          if (response.payload.loginSuccess) {
            props.history.push("/notconfirmation");
          } else {
            alert("회원가입에 실패하였습니다.");
          }
        });
      }
    });
  };

  //구글회원가입
  const responseGoogle = (res) => {
    
    let body = {
      email: res.profileObj.email,
      name: res.profileObj.name,
      password: res.profileObj.googleId,
      image: res.profileObj.imageUrl,
      isVerified: true,
    }
    console.log("바디", res);

    dispatch(registerUser(body))
      .then(response => {
        if(response.payload.success){
          alert("회원가입 성공")
          props.history.push('/login')
          console.log("임마", body);
        }else{
          alert("이미 가입된 회원입니다")
          props.history.push('/')
        }
      }
    )
  }

  //카카오톡 회원가입
  const responseKaKao = (res) => {
    //카카오톡은 id가 Number여서 String으로 변환해줘야 로그인시 오류가 안남
    let pw = res.profile.id
    pw = String(pw);
    console.log(pw);

    let body = {
      email: res.profile.kakao_account.email,
      name: res.profile.properties.nickname,
      password: pw,
      image: res.profile.properties.profile_image,
      isVerified: true,
    }
    console.log("바디", body);

    dispatch(registerUser(body))
      .then(response => {
        if(response.payload.success == true){
          alert("회원가입 성공")
          props.history.push('/login')
        }else{
          alert("이미 가입된 회원입니다")
          props.history.push('/')
        }
      }
    )
  }

  //페이스북 회원가입
  const responseFacebook = (res) => {
    //
    let body = {
      email: res.email,
      name: res.name,
      password: res.id,
      image: res.picture.data.url,
      isVerified: true,
    }
    console.log("바디", body);

    dispatch(registerUser(body))
      .then(response => {
        if(response.payload.success){
          alert("회원가입 성공")
          props.history.push('/login')
        }else{
          alert("이미 가입된 회원입니다")
          props.history.push('/')
        }
      }
    )

  }

  //소셜로그인 실패시 에러로그
  const responseFail = (err) => {
    console.error(err);
  }


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
      <form
        style={{ display: "flex", flexDirection: "column" }}
        onSubmit={onSubmitHandler}
      >
        <label>Email</label>
        <input type="email" value={Email} onChange={onEmailHandler} />

        <label>Name</label>
        <input type="text" value={Name} onChange={onNameHandler} />

        <label>PassWord</label>
        <input type="password" value={Password} onChange={onPasswordHandler} />

        <label>Confirm PassWord</label>
        <input
          type="password"
          value={ConfirmPassword}
          onChange={onConfirmPasswordHandler}
        />

        <br />
        <button type="submit">회원 가입</button>

        <br />
        <GoogleLogin
          clientId={'297011327835-5bmnie06q1t9abcmp2sbv1a5oomfsk6g.apps.googleusercontent.com'}
          buttonText="Google"
          onSuccess={result => responseGoogle(result)}
          onFailure={responseFail}
        />

        <br/>
        <KaKaoBtn
          //styled component 통해 style을 입혀 줄 예정 
          jsKey={'2c0529d015c5bd510bb0a3586f896493'}
          //카카오에서 할당받은 jsKey를 입력
          buttonText='카카오 계정으로 회원가입'
          //로그인 버튼의 text를 입력
          onSuccess={responseKaKao}
          //성공했을때 불러올 함수로서 fetch해서 localStorage에 저장할 함수를 여기로 저장 
          getProfile={true}
        />
        
        <br/>
        <FacebookLogin
          appId="231025038177009"
          fields="name,email,picture,id"
          callback={responseFacebook}
        />

      </form>
    </div>
  );
}

//카카오톡 버튼 스타일
const KaKaoBtn = styled(KaKaoLogin)`
  padding: 0;
  width: 300px;
  height: 45px;
  line-height: 44px;
  color: #783c00;
  background-color: #ffeb00;
  border: 1px solid transparent;
  border-radius: 3px;
  font-size: 14px;
  font-weight: bold;
  text-align: center;
  cursor: pointer;
  &:hover {
    box-shadow: 0 0px 15px 0 rgba(0, 0, 0, 0.2);
  }
`;

export default withRouter(RegisterPage);
