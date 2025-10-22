import React, { useEffect, useRef, useState } from 'react'
import type { Engine, Scene, ArcRotateCamera, HemisphericLight, MeshBuilder, Vector3 } from '@babylonjs/core'
import { supabase } from '../lib/supabaseClient'
import { ECO_ZONES } from '@mmm/shared'

// Dynamically import Babylon to cut bundle size
async function loadBabylon() {
  const core = await import('@babylonjs/core')
  await import('@babylonjs/loaders')
  return core
}

interface Presence { id: string; x: number; y: number; color: string }

const MetaversePage: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const engineRef = useRef<Engine | null>(null)
  const sceneRef = useRef<Scene | null>(null)
  const [vrSupported, setVrSupported] = useState<boolean>(false)
  const [presence, setPresence] = useState<Record<string, Presence>>({})

  useEffect(() => {
    let dispose: (() => void) | undefined
    let core: any

    ;(async () => {
      core = await loadBabylon()
      const { Engine, Scene, ArcRotateCamera, HemisphericLight, MeshBuilder, Vector3 } = core
      const canvas = canvasRef.current!
      const engine: Engine = new Engine(canvas, true)
      const scene: Scene = new Scene(engine)
      engineRef.current = engine
      sceneRef.current = scene

      const camera: ArcRotateCamera = new ArcRotateCamera('camera', Math.PI / 2, Math.PI / 3, 30, new Vector3(0, 0, 0), scene)
      camera.attachControl(canvas, true)
      const light: HemisphericLight = new HemisphericLight('light', new Vector3(0, 1, 0), scene)
      light.intensity = 0.9

      // Ground plane as Morocco plane placeholder
      MeshBuilder.CreateGround('ground', { width: 200, height: 120 }, scene)

      // Render eco zones as elevated markers
      ECO_ZONES.forEach((z, idx) => {
        const sphere = MeshBuilder.CreateSphere('zone'+idx, { diameter: 2 }, scene)
        const x = (z.coordinates[0] + 10) * 5
        const y = (z.coordinates[1] - 32) * 5
        sphere.position = new Vector3(x, 1, y)
      })

      // Local avatar (box)
      const me = MeshBuilder.CreateBox('me', { size: 2 }, scene)
      me.position = new Vector3(0, 1, 0)

      // Basic keyboard movement
      const speed = 0.6
      const keys: Record<string, boolean> = {}
      window.addEventListener('keydown', (e) => { keys[e.key.toLowerCase()] = true })
      window.addEventListener('keyup', (e) => { keys[e.key.toLowerCase()] = false })

      scene.onBeforeRenderObservable.add(() => {
        if (keys['w'] || keys['arrowup']) me.position.z -= speed
        if (keys['s'] || keys['arrowdown']) me.position.z += speed
        if (keys['a'] || keys['arrowleft']) me.position.x -= speed
        if (keys['d'] || keys['arrowright']) me.position.x += speed
      })

      engine.runRenderLoop(() => scene.render())

      // WebXR support check
      // @ts-ignore
      setVrSupported(!!navigator.xr)

      // Supabase presence using realtime channels
      if (supabase) {
        const id = Math.random().toString(36).slice(2)
        const color = '#'+Math.floor(Math.random()*16777215).toString(16)
        const sb = supabase
        const channel = sb.channel('presence:metaverse', { config: { presence: { key: id } } })
        channel
          .on('presence', { event: 'sync' }, () => {
            const state = channel.presenceState() as Record<string, Array<Presence>>
            const merged: Record<string, Presence> = {}
            Object.values(state).flat().forEach((p) => { merged[p.id] = p })
            setPresence(merged)
          })
          .subscribe(async (status) => {
            if (status === 'SUBSCRIBED') {
              channel.track({ id, x: me.position.x, y: me.position.z, color })
              scene.onBeforeRenderObservable.add(() => {
                channel.track({ id, x: me.position.x, y: me.position.z, color })
              })
            }
          })

        dispose = () => { sb.removeChannel(channel) }
      }

      dispose = (() => {
        const prev = dispose
        return () => {
          prev && prev()
          engine.dispose()
        }
      })()
    })()

    return () => { dispose && dispose() }
  }, [])

  return (
    <div className="h-full">
      <div className="fixed top-2 left-2 z-50 bg-white/90 rounded shadow px-3 py-2 text-sm">
        <div className="font-semibold">Metaverse</div>
        <div>Users online: {Object.keys(presence).length}</div>
      </div>
      <canvas ref={canvasRef} style={{ width: '100%', height: '100%' }} />
      {vrSupported && (
        <button
          className="fixed bottom-4 right-4 z-50 bg-indigo-600 text-white rounded px-4 py-2"
          onClick={() => {
            // Babylon will create default XR experience if supported
            (async () => {
              const core = await loadBabylon();
              const scene = sceneRef.current!
              // @ts-ignore
              const xrHelper = await scene.createDefaultXRExperienceAsync({})
              await xrHelper.baseExperience.enterXRAsync('immersive-vr', 'local-floor')
            })()
          }}
        >Enter VR</button>
      )}
    </div>
  )
}

export default MetaversePage
