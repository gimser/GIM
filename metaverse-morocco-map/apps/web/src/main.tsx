import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import './styles.css'
import './i18n'
import MapPage from './pages/MapPage'
import CityPage from './pages/CityPage'
import LoginPage from './pages/LoginPage'
import AppShell from './AppShell'
import ExplorePage from './pages/ExplorePage'
import AdminPage from './pages/AdminPage'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <AppShell>
        <Routes>
          <Route path="/" element={<Navigate to="/map" replace />} />
          <Route path="/map" element={<MapPage />} />
          <Route path="/city/:cityId" element={<CityPage />} />
          <Route path="/explore" element={<ExplorePage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </AppShell>
    </BrowserRouter>
  </React.StrictMode>
)
