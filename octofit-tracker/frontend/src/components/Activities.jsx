import { useEffect, useState } from 'react'
import { fetchApiList } from '../api'

const codespaceEndpoint = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/activities/`
  : null
const endpoint = codespaceEndpoint ?? '/api/activities/'

function Activities() {
  const [activities, setActivities] = useState([])
  const [status, setStatus] = useState('loading')

  useEffect(() => {
    let isActive = true

    fetchApiList(endpoint)
      .then((data) => {
        if (isActive) {
          setActivities(data)
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
    return <p className="status-message">Loading activities...</p>
  }

  if (status === 'error') {
    return <p className="status-message text-danger">Unable to load activities.</p>
  }

  return (
    <section className="content-section">
      <div className="section-heading">
        <p className="eyebrow">Training log</p>
        <h1>Activities</h1>
      </div>
      <div className="table-responsive">
        <table className="table align-middle">
          <thead>
            <tr>
              <th scope="col">Member</th>
              <th scope="col">Activity</th>
              <th scope="col">Duration</th>
              <th scope="col">Date</th>
            </tr>
          </thead>
          <tbody>
            {activities.map((activity) => (
              <tr key={activity._id}>
                <td>{activity.user?.name ?? 'Unknown'}</td>
                <td>{activity.type}</td>
                <td>{activity.durationMinutes} min</td>
                <td>{activity.date ? new Date(activity.date).toLocaleDateString() : 'Not set'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

export default Activities
