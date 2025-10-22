import React from 'react'
import { Link, useLocation } from 'react-router-dom'

const BottomNav: React.FC = () => {
  const loc = useLocation()
  const active = (p: string) => loc.pathname.startsWith(p)
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white/95 border-t flex justify-around py-2 md:hidden z-50">
      <Link className={`px-3 py-1 ${active('/map')?'text-indigo-600 font-semibold':''}`} to="/map">Map</Link>
      <Link className={`px-3 py-1 ${active('/city')?'text-indigo-600 font-semibold':''}`} to="/city/marrakech">Stores</Link>
      <Link className={`px-3 py-1 ${active('/metaverse')?'text-indigo-600 font-semibold':''}`} to="/metaverse">Metaverse</Link>
      <Link className={`px-3 py-1 ${active('/explore')?'text-indigo-600 font-semibold':''}`} to="/explore">Guide</Link>
      <Link className={`px-3 py-1 ${active('/login')?'text-indigo-600 font-semibold':''}`} to="/login">Profile</Link>
    </nav>
  )
}

export default BottomNav
