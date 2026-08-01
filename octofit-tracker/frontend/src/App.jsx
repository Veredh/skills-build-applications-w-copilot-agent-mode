import { NavLink, Navigate, Route, Routes } from 'react-router-dom'
import octofitLogo from '../../../docs/octofitapp-small.png'
import { apiBaseUrl } from './api'
import './App.css'
import Activities from './components/Activities'
import Leaderboard from './components/Leaderboard'
import Teams from './components/Teams'
import Users from './components/Users'
import Workouts from './components/Workouts'

function App() {
  const navItems = [
    { path: '/users', label: 'Users' },
    { path: '/teams', label: 'Teams' },
    { path: '/activities', label: 'Activities' },
    { path: '/leaderboard', label: 'Leaderboard' },
    { path: '/workouts', label: 'Workouts' },
  ]

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand-lockup">
          <img src={octofitLogo} alt="OctoFit Tracker" />
          <div>
            <span>OctoFit</span>
            <strong>Tracker</strong>
          </div>
        </div>
        <nav aria-label="Primary navigation">
          {navItems.map((item) => (
            <NavLink className="nav-link" key={item.path} to={item.path}>
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="api-panel">
          <span>API</span>
          <code>{apiBaseUrl}</code>
        </div>
      </aside>

      <main className="main-panel">
        <Routes>
          <Route path="/" element={<Navigate to="/users" replace />} />
          <Route path="/users" element={<Users />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/workouts" element={<Workouts />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
