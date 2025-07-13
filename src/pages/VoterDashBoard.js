import React, { useEffect, useState } from 'react'
import AxiosInstance from '../api/AxiosInstance';
import '../styles/Dashboard.css'

const VoterDashBoard = () => {
  const [candidates, setCandidates] = useState([]);
  const [votedCandidate, setVotedCandidate] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetchAllCandidates();
    checkVotedCandidate();
  }, [])
  async function fetchAllCandidates() {
    try {
      const response = await AxiosInstance.get('/voter/candidates')
      setCandidates(response.data)
    } catch (error) {
      alert('Error Fetching Candidates')
    }
  }
  const checkVotedCandidate = async () => {
    try {
      const response = await AxiosInstance.get('/voter/voted-candidate')
      setVotedCandidate(response.data)
    } catch (error) {
      setVotedCandidate(null)
    } finally {
      setLoading(false)
    }
  }
  const castVote = async (candidateId) => {
    try {
      const response = await AxiosInstance.post(`/voter/vote/${candidateId}`)
      alert(response.data)
      fetchAllCandidates()
    } catch (error) {
      alert('Failed to Vote Candidate')
    }
  }
  return (
    <div className="voter-dashboard">
      <h2 className="dashboard-title">Voter DashBoard</h2>
      {loading ? (<p className="loading-text">Loading...</p>) : votedCandidate ? (<p className="voted-info">You are Already Voted For: <strong>{votedCandidate.name}</strong> ({votedCandidate.party}) ({votedCandidate.symbol})</p>) : (
        <>
          <h3>Vote For a Candidate</h3>
          <ul className="candidate-list">
            {candidates.map((candidate) => (
              <li key={candidate.id}>{candidate.name} - {candidate.party} - {candidate.symbol}
                <button onClick={() => castVote(candidate.id)}>Vote</button>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  )
}

export default VoterDashBoard