
import AxiosInstance from '../api/AxiosInstance';
import  { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';

const Login = () => {
    const {state} = useLocation();
    const roleText = state?.role || '';
    const [email , setEmail] = useState("");
    const [password , setPassword] = useState("");
    const navigate = useNavigate();

    async function handleLogin(e){
        e.preventDefault();
        try {
            const response = await AxiosInstance.post('auth/login',{email , password})
            const token = response.data.token;
            localStorage.setItem('token',token);
            const payload = JSON.parse(atob(token.split('.')[1])) //header.payload.signature
            const role = payload.role;
            if(role === 'ADMIN' || role === 'ROLE_ADMIN'){
                navigate('/admin')
            }else if(role === 'VOTER' || role === 'ROLE_VOTER'){
                navigate('/voter')
            }else{
                alert('Unknown Role')
            }
        } catch (error) {
            alert('Invalid email or password')
        }
    }
    return (
        <div>
            <h2>{roleText === 'ADMIN' ? 'Admin Login' : roleText === 'VOTER' ? 'Voter Login' : 'Login'}</h2>
            <form onSubmit={handleLogin}>
                <input type='email' placeholder='Email' value={email} onChange={(e)=>setEmail(e.target.value)} required/><br/>
                <input type='password' placeholder='Password' value={password} onChange={(e)=>setPassword(e.target.value)} required/><br/>
                <button type='submit'>Login</button>
            </form>
        </div>
    )
}

export default Login