import '../App.css'
import {Box} from '@mui/material'
import MyTextFields from './forms/MyTextFields'
import MyPasswordFields from './forms/MyPasswordFields'
import MyButtons from './forms/MyButtons'
import {Link, useNavigate} from 'react-router-dom'
import { useForm } from 'react-hook-form'; // React Hook Form is a lightweight, performant library for building and validating forms in React using hooks.
import AxiosInstance from './forms/AxiosInstance'




const Register=()=>{
    const navigate=useNavigate()
    const { handleSubmit, control } = useForm();

    const submission = (data)=>{
        AxiosInstance.post(`register/`,{
            email:data.email,
            password:data.password,
        })
        .then(()=>{
            navigate(`/`)
        })
    }

    return(
        <div className={"myBackground"}>
            <form onSubmit={handleSubmit(submission)}>
            <Box className={"whiteBox"}>
                <Box className={"itemBox"}>
                    <Box className={"title"}>Register for SM App </Box>
                </Box>

                <Box className={'itemBox'}>
                    <MyTextFields label={"Email"} name={'email'} control={control}/>
                </Box>

                <Box className={'itemBox'}>
                    <MyPasswordFields label={"Password"} name={'password'} control={control}/>
                </Box>

                <Box className={'itemBox'}>
                    <MyPasswordFields label={"Confirm Password"} name={'password'} control={control}/>
                </Box>

                <Box className={'itemBox'}>
                    <MyButtons type={"submit"} label={"Register"}/>
                </Box>

                <Box className={'itemBox'}>
                    <Link to="/">Already registered? Please Login!</Link>
                </Box>
            </Box>
            </form>
        </div>
    )
}

export default Register