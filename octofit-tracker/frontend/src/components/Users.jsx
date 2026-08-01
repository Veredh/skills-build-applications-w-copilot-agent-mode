import { useEffect, useState } from 'react'
import { fetchApiList } from '../api'

const codespaceEndpoint = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/users/`
  : null
const endpoint = codespaceEndpoint ?? '/api/users/'

function Users() {
  const [users, setUsers] = useState([])
  const [status, setStatus] = useState('loading')

  useEffect(() => {
    let isActive = true

    fetchApiList(endpoint)
      .then((data) => {
        if (isActive) {
          setUsers(data)
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
    return <p className="status-message">Loading users...</p>
  }

  if (status === 'error') {
    return <p className="status-message text-danger">Unable to load users.</p>
  }

  return (
    <section className="content-section">
      <div className="section-heading">
        <p className="eyebrow">Profiles</p>
        <h1>Users</h1>
      </div>
      <div className="data-grid">
        {users.map((user) => (
          <article className="data-card" key={user._id ?? user.email}>
            <h2>{user.name}</h2>
            <p>{user.email}</p>
            <span className="badge text-bg-success">{user.role}</span>
          </article>
        ))}
      </div>
    </section>
  )
}

export default Users
