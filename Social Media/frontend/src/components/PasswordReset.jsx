import '../App.css'
import {Box} from '@mui/material'
import MyTextFields from './forms/MyTextFields'
import MyPasswordFields from './forms/MyPasswordFields'
import MyButtons from './forms/MyButtons'
import {Link, useNavigate, useParams} from 'react-router-dom'
import { useForm } from 'react-hook-form'
import AxiosInstance from './forms/AxiosInstance'
import { useState } from 'react'
import Message from './Message'


const PasswordReset = () => {

    const navigate=useNavigate()
    const {token,uid} = useParams()
    console.log(token)
     const { handleSubmit, control } = useForm();
     const [showMessage, setShowMessage] =  useState(false)

     const submission = (data)=>{
        console.log("Form Data →", data);
        AxiosInstance.post(`api/password_reset/confirm/`,{
            uid: uid,
            password:data.password,
            token:token
        })
        .then((response)=>{
            setShowMessage(true)
            setTimeout(()=>{
                navigate('/')
            },2000)
        })
  .catch((error) => {
    console.error("Password reset error:", error.response?.data);  // <-- LOG THE ERROR
    alert("Reset error: " + JSON.stringify(error.response?.data));  // <-- SHOW IN ALERT
});
       
    }

    return (
        <div className={"myBackground"}>
             {showMessage? <Message text = {" you password reset is successfull, you will be directed to login page in a second"} color={'#69C9AB'}/> : null}
                    <form onSubmit={handleSubmit(submission)}> 
                   <Box className={"whiteBox"}>
                       <Box className={"itemBox"}>
                           <Box className={"title"}> Password reset </Box>
                       </Box>
       
                        <Box className={'itemBox'}>
                                <MyPasswordFields label={"password"} name={'password'} control={control}/>
                        </Box>
                         <Box className={'itemBox'}>
                                <MyPasswordFields label={"Confirm password"} name={'password2'} control={control}/>
                        </Box>
       
                       <Box className={'itemBox'}>
                           <MyButtons label={"Reset password "}  type={"submit"} />
                       </Box>
       
                       
                        
                   </Box>
                  </form>
               </div>
    )
}

export default PasswordReset