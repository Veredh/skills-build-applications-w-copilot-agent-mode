import { useEffect, useState } from 'react'
import { fetchApiList } from '../api'

const codespaceEndpoint = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/`
  : null
const endpoint = codespaceEndpoint ?? '/api/leaderboard/'

function Leaderboard() {
  const [entries, setEntries] = useState([])
  const [status, setStatus] = useState('loading')

  useEffect(() => {
    let isActive = true

    fetchApiList(endpoint)
      .then((data) => {
        if (isActive) {
          setEntries(data)
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
    return <p className="status-message">Loading leaderboard...</p>
  }

  if (status === 'error') {
    return <p className="status-message text-danger">Unable to load leaderboard.</p>
  }

  return (
    <section className="content-section">
      <div className="section-heading">
        <p className="eyebrow">Rankings</p>
        <h1>Leaderboard</h1>
      </div>
      <ol className="leaderboard-list">
        {entries.map((entry, index) => (
          <li className="leaderboard-row" key={entry._id}>
            <span className="rank">#{index + 1}</span>
            <span>{entry.user?.name ?? 'Unknown athlete'}</span>
            <strong>{entry.score} pts</strong>
          </li>
        ))}
      </ol>
    </section>
  )
}

export default Leaderboard
