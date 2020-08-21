import React, { useEffect } from "react";
import axios from 'axios'
import { withRouter} from 'react-router-dom'

function Confirmation(props) {

  useEffect(() => {
    const getConfirmation = ()=>{
      axios.get(`/api/users/getConfirmation`);
    };
    getConfirmation()
    alert("인증에 성공하였습니다.")
  },[]);


  return (
    <div style={{
      display: 'flex', justifyContent: 'center', alignItems:'center'
      ,width: '100%', height: '100vh'
    }}>      
    <p>confirmation</p><br/>
    </div>
  )
}

export default withRouter(Confirmation)
