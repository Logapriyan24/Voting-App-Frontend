import React, { useState } from 'react'
import AxiosInstance from '../api/AxiosInstance';
import { useLocation, useNavigate } from 'react-router-dom';
const Register = () => {
    const {state} = useLocation()
    const defaultRole = state?.role || 'VOTER'
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [role, setRole] = useState("VOTER");
    const navigate = useNavigate();
    async function handleRegister(e) {
        e.preventDefault();
        try {
            const response = await AxiosInstance.post('/auth/register', {
                name, email, password, role
            })
            const token = response.data.token;
            localStorage.setItem('token', token);
            const payload = JSON.parse(atob(token.split('.')[1]))
            const userRole = payload.role;
            if (userRole === 'ADMIN') {
                navigate('/admin')
            } else if (userRole === 'VOTER') {
                navigate('/voter')
            } else {
                alert('Unknown role')
            }
        } catch (error) {
            alert('Registration failed')
        }
    }
    return (
        <div>
            <h2>{defaultRole === 'ADMIN' ? 'Admin Registration' : 'Voter Registration'}</h2>
            <form onSubmit={handleRegister}>
                <input type='text' placeholder='Name' value={name} onChange={(e) => setName(e.target.value)} required /><br />
                <input type='email' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} required /><br />
                <input type='password' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} required /><br />
                <select value={role} onChange={(e) => setRole(e.target.value)}>
                    <option value='VOTER'>Voter</option>
                    <option value='ADMIN'>Admin</option>
                </select><br />
                <button type='submit'>Register</button>
            </form>
        </div>
    )
}

export default Register