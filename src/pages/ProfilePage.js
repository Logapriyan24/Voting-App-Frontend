import React from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/ProfilePage.css'

const ProfilePage = () => {
    const navigate = useNavigate();
    return (
        <div className='profile-container'>
            <h1>Welcome to Election 2025</h1>
            <p>Your Vote ,Your Voice, Your Future</p>

            <div className='profile-options'>
                <div className='profile-card'>
                    <h2>🧑‍🤝‍🧑 Voter</h2>
                    <p>Participate in shaping your future. Cast your vote wisely!</p>
                    <button onClick={()=>navigate('/login',{state : {role : 'VOTER'}})}>Voter Login</button>
                    <button onClick={()=>navigate('/register',{state:{role:'VOTER'}})}>Voter Register</button>
                </div>
                <div className='profile-card'>
                    <h2>🧑‍💼 Admin</h2>
                    <p>Manage candidates, votes, and oversee the election process.</p>
                    <button onClick={()=>navigate('/login',{state:{role:'ADMIN'}})}>Admin Login</button>
                    <button onClick={()=>navigate('/register',{state:{role:'ADMIN'}})}>Admin Register</button>
                </div>
                <p className='footer'>
                    “The future of the nation is built by those who participate.”
                </p>

            </div>
        </div>
    )
}

export default ProfilePage