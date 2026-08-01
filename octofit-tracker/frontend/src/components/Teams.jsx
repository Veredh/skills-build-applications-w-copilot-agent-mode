import { useEffect, useState } from 'react'
import { fetchApiList } from '../api'

const codespaceEndpoint = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/teams/`
  : null
const endpoint = codespaceEndpoint ?? '/api/teams/'

function Teams() {
  const [teams, setTeams] = useState([])
  const [status, setStatus] = useState('loading')

  useEffect(() => {
    let isActive = true

    fetchApiList(endpoint)
      .then((data) => {
        if (isActive) {
          setTeams(data)
          setStatus('ready')
        }
      })
      .catch(() => {
        if (isActive) {
          setStatus('error')
        }
      })

    return () => {
      isActive = false
    }
  }, [])

  if (status === 'loading') {
    return <p className="status-message">Loading teams...</p>
  }

  if (status === 'error') {
    return <p className="status-message text-danger">Unable to load teams.</p>
  }

  return (
    <section className="content-section">
      <div className="section-heading">
        <p className="eyebrow">Groups</p>
        <h1>Teams</h1>
      </div>
      <div className="data-grid">
        {teams.map((team) => (
          <article className="data-card" key={team._id ?? team.name}>
            <h2>{team.name}</h2>
            <p>{team.members?.length ?? 0} members</p>
            <div className="member-list">
              {team.members?.map((member) => (
                <span className="badge text-bg-light" key={member._id ?? member.email}>{member.name}</span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

export default Teams
