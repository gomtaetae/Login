import React, { useEffect } from "react";
import axios from "axios"
import { withRouter} from 'react-router-dom'

function NotConfirmation(props) {

useEffect(()=>{
  axios.get('api/users/auth')
    .then(response => {
      console.log("auth라고 말해주세요",response.data)
      if(response.data.isVerified){
        props.history.push("/")
      }
    })
},[])


const onClickHandler = () => {
  axios.get('api/users/logout')
    .then(response =>{
      console.log('response.data : ',response.data)
      if(response.data.success){
        alert("로그아웃에 성공했습니다.")
        props.history.push("/")   
      } else {
        alert("로그아웃 하는데 실패 했습니다.")
      }
    }) 
}

const onResendEmail = () =>{
  axios.get('/api/users/resend')
  .then(response => {
    console.log('onResendEmail',response.data)
    if(response.data.success){
      alert("이메일을 보냈습니다.")
    } else {
      alert("이메일 보내는데 실패 했습니다.")
    }
  })
}


  return (
    <div style={{
      display: 'flex', justifyContent: 'center', alignItems:'center'
      ,width: '100%', height: '100vh'
    }}> 
        <p>이메일 인증을 하십시오.</p>
        <p><button onClick={onClickHandler}>로그아웃</button></p>
        <p><button onClick={onResendEmail}>이메일 인증 재요청</button></p>
    </div>
  )
}

export default withRouter(NotConfirmation)