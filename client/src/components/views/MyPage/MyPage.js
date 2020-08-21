import React, { useState } from "react";
import axios from 'axios'
import { withRouter} from 'react-router-dom'


function MyPage(props) {

  const [Password, setPassword] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");



  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value);
  }

  const onConfirmPasswordHandler = (event) => {
    setConfirmPassword(event.currentTarget.value);
  }


  const onSubmitHandler = (event) => {
    event.preventDefault();



    if(Password !== ConfirmPassword){
      return alert('비밀번호와 비밀번호 확인은 같아야 합니다.')
    }
    let body = {
      password: Password,
    };  
    //ConfirmPassword는 데이터베이스로 보내지 않기 때문에 body x

    // axios.post('/api/users/modify',body)
    // .then(response => console.log("mypage",response.data.user))
  };
  



  return (
    <div style={{
      display: 'flex', justifyContent: 'center', alignItems:'center'
      ,width: '100%', height: '100vh'
    }}>
      <form style={{display:'flex', flexDirection: 'column'}}
          onSubmit={onSubmitHandler}
      >
        <label>PassWord</label>
        <input type="password" value={Password} onChange={onPasswordHandler}/>

        <label>Confirm PassWord</label>
        <input type="password" value={ConfirmPassword} onChange={onConfirmPasswordHandler}/>
        
        <br/>

        <button type = "submit">
          회원 수정
        </button>
      </form>
      
    </div>
  )
}

export default withRouter(MyPage)
