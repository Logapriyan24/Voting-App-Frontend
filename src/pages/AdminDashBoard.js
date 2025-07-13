import React, { useEffect, useState } from 'react'
import AxiosInstance from '../api/AxiosInstance';
import '../styles/AdminDashboard.css'

const AdminDashBoard = () => {
  const [candidate, setCandidate] = useState([]);
  const [name, setName] = useState('');
  const [party, setParty] = useState('');
  const [symbol, setSymbol] = useState('');
  useEffect(() => {
    fetchCandidates();
  }, [])
  async function fetchCandidates() {
    try {
      const response = await AxiosInstance.get('/admin/candidates/all')
      setCandidate(response.data);
    } catch (error) {
      alert('Error fetching Candidates')
    }
  }
  const handleAddCandidate = async(e) => {
    e.preventDefault(); 
    try{
      const response = await AxiosInstance.post('/admin/candidates',{
        name,party,symbol
      })
      setName('')
      setParty('')
      setSymbol('')
      fetchCandidates();
    } catch(error){
      alert('Failed to add Candidate')
    }
  }
  return (
    <div className='admin-dashboard'>
      <h2 className='dashboard-title'>AdminDashBoard</h2>
      <form onSubmit={handleAddCandidate} className="add-candidate-form">
        <input type='text' placeholder='Name' value={name} onChange={(e) => setName(e.target.value)} required /><br />
        <input type='text' placeholder='Party' value={party} onChange={(e) => setParty(e.target.value)} required /><br />
        <input type='text' placeholder='Symbol (e.g. 🗳️)' value={symbol} onChange={(e) => setSymbol(e.target.value)} required /><br />
        <button type='submit'>Add Candidate</button>
      </form>
      <h3>All Candidates</h3>
      <ul className="candidate-list">
        {candidate.map((cand) => (
          <li key={cand.id}>{cand.name} - {cand.party} - {cand.symbol} - Votes: {cand.voteCount}</li>
        ))}
      </ul>
    </div>
  )
}

export default AdminDashBoard