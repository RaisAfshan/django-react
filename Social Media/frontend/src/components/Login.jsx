import '../App.css'
import {Box} from '@mui/material'
import MyTextFields from './forms/MyTextFields'
import MyPasswordFields from './forms/MyPasswordFields'
import MyButtons from './forms/MyButtons'
import {Link, useNavigate} from 'react-router-dom'
import { useForm } from 'react-hook-form'
import AxiosInstance from './forms/AxiosInstance'


const Login=()=>{
     const navigate=useNavigate()
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
            console.log('error---> ',error)
        })
    }
    


    return(
        <div className={"myBackground"}>
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

                <Box className={'itemBox'}>
                    <Link to="/register"> No account yet? Please register!</Link>
                </Box>
                 
            </Box>
           </form>
        </div>
    )
}

export default Login