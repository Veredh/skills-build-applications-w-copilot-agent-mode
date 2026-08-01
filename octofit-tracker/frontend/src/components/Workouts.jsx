import { useEffect, useState } from 'react'
import { fetchApiList } from '../api'

const codespaceEndpoint = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/workouts/`
  : null
const endpoint = codespaceEndpoint ?? '/api/workouts/'

function Workouts() {
  const [workouts, setWorkouts] = useState([])
  const [status, setStatus] = useState('loading')

  useEffect(() => {
    let isActive = true

    fetchApiList(endpoint)
      .then((data) => {
        if (isActive) {
          setWorkouts(data)
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
    return <p className="status-message">Loading workouts...</p>
  }

  if (status === 'error') {
    return <p className="status-message text-danger">Unable to load workouts.</p>
  }

  return (
    <section className="content-section">
      <div className="section-heading">
        <p className="eyebrow">Suggestions</p>
        <h1>Workouts</h1>
      </div>
      <div className="data-grid">
        {workouts.map((workout) => (
          <article className="data-card" key={workout._id ?? workout.title}>
            <div className="card-title-row">
              <h2>{workout.title}</h2>
              <span className="badge text-bg-primary">{workout.difficulty}</span>
            </div>
            <p>{workout.description}</p>
            <strong>{workout.durationMinutes} min</strong>
          </article>
        ))}
      </div>
    </section>
  )
}

export default Workouts
