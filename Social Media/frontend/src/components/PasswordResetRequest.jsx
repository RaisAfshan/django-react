import '../App.css'
import {Box} from '@mui/material'
import MyTextFields from './forms/MyTextFields'
import MyPasswordFields from './forms/MyPasswordFields'
import MyButtons from './forms/MyButtons'
import {Link, useNavigate} from 'react-router-dom'
import { useForm } from 'react-hook-form'
import AxiosInstance from './forms/AxiosInstance'
import { useState } from 'react'
import Message from './Message'


const PasswordResetRequest = () => {

    const navigate=useNavigate()
     const { handleSubmit, control } = useForm();
     const [showMessage, setShowMessage] =  useState(false)

     const submission = (data)=>{
        console.log("Form Data →", data);
        AxiosInstance.post(`api/password_reset/`,{
            email:data.email,
        })
        .then((response)=>{
            setShowMessage(true)
        })
       
    }

    return (
        <div className={"myBackground"}>
             {showMessage? <Message text = {"if you email you have revieved an email with intruction to reset the password"} color={'#69C9AB'}/> : null}
                    <form onSubmit={handleSubmit(submission)}> 
                   <Box className={"whiteBox"}>
                       <Box className={"itemBox"}>
                           <Box className={"title"}> Password reset </Box>
                       </Box>
       
                       <Box className={'itemBox'}>
                           <MyTextFields label={"Email"} name={'email'} control={control}/>
                       </Box>
       
                       <Box className={'itemBox'}>
                           <MyButtons label={"Request password reset"}  type={"submit"} />
                       </Box>
       
                       
                        
                   </Box>
                  </form>
               </div>
    )
}

export default PasswordResetRequest