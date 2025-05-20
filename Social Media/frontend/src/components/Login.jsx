import '../App.css'
import {Box} from '@mui/material'
import MyTextFields from './forms/MyTextFields'
import MyPasswordFields from './forms/MyPasswordFields'
import MyButtons from './forms/MyButtons'
import {Link, useNavigate} from 'react-router-dom'
import { useForm } from 'react-hook-form'
import AxiosInstance from './forms/AxiosInstance'
import Message from './Message'
import { useState } from 'react'



const Login=()=>{
     const navigate=useNavigate()
     const [ShowMessage, setShowMessage] = useState(false)
     const { handleSubmit, control } = useForm();

     const submission = (data)=>{
        console.log("Form Data →", data);
        AxiosInstance.post(`login/`,{
            email:data.email,
            password:data.password,
        })
        .then((response)=>{
            console.log(response)
            localStorage.setItem('token',response.data.token)
            navigate(`/home`)
        })
        .catch((error)=>{
             setShowMessage(true)
            console.log('error---> ',error)
        })
    }
    


    return(
        <div className={"myBackground"}>
            {ShowMessage ? <Message text={"Login has failed, please try again, or reset your password"} color={'#EC5A76'}/> : null}
             <form onSubmit={handleSubmit(submission)}>
            <Box className={"whiteBox"}>
                <Box className={"itemBox"}>
                    <Box className={"title"}>Login for SM App </Box>
                </Box>

                <Box className={'itemBox'}>
                    <MyTextFields label={"Email"} name={'email'} control={control}/>
                </Box>

                <Box className={'itemBox'}>
                    <MyPasswordFields label={"password"} name={'password'} control={control}/>
                </Box>

                <Box className={'itemBox'}>
                    <MyButtons label={"Sign in"}  type={"submit"} />
                </Box>

                <Box className={'itemBox'} sx={{flexDirection:'column'}} gap={1}>
                    <Link to="/register"> No account yet? Please register!</Link>
                    <Link to="/request/password_reset"> Password forgotten? click here!</Link>
                </Box>
                 
            </Box>
           </form>
        </div>
    )
}

export default Login