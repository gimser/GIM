import React, { useState } from 'react'

const ExplorePage: React.FC = () => {
  const [cityId, setCityId] = useState('marrakech')
  const [eco, setEco] = useState(true)
  const [resp, setResp] = useState<any>(null)

  const ask = async () => {
    const r = await fetch('/api/guide', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ cityId, interests: eco ? ['eco'] : [] })
    })
    setResp(await r.json())
  }

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Explore</h1>
      <div className="flex items-center gap-2">
        <select className="border rounded px-2 py-1" value={cityId} onChange={(e)=>setCityId(e.target.value)}>
          <option value="casablanca">Casablanca</option>
          <option value="rabat">Rabat</option>
          <option value="marrakech">Marrakech</option>
          <option value="fes">Fes</option>
          <option value="tangier">Tangier</option>
          <option value="agadir">Agadir</option>
        </select>
        <label className="inline-flex items-center gap-2">
          <input type="checkbox" checked={eco} onChange={(e)=>setEco(e.target.checked)} /> Eco tips
        </label>
        <button className="px-3 py-1 bg-indigo-600 text-white rounded" onClick={ask}>Ask AI Guide</button>
      </div>

      {resp && (
        <div className="space-y-2">
          <div className="font-semibold">Suggestions</div>
          <ul className="list-disc pl-5">
            {(resp.suggestions ?? []).map((s:any, idx:number) => (
              <li key={idx}><span className="font-medium">{s.title}:</span> {s.description}</li>
            ))}
          </ul>
          {resp.ecoTips?.length ? (
            <div>
              <div className="font-semibold mt-2">Eco Tips</div>
              <ul className="list-disc pl-5">
                {resp.ecoTips.map((t:string, idx:number) => <li key={idx}>{t}</li>)}
              </ul>
            </div>
          ) : null}
        </div>
      )}
    </div>
  )
}

export default ExplorePage
