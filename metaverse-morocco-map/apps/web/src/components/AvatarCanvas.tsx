import React, { useEffect, useRef } from 'react'
import * as THREE from 'three'

const AvatarCanvas: React.FC = () => {
  const mountRef = useRef<HTMLDivElement | null>(null)
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null)

  useEffect(() => {
    const mount = mountRef.current!
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 100)
    camera.position.z = 3

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(120, 120)
    mount.appendChild(renderer.domElement)
    rendererRef.current = renderer

    const light = new THREE.HemisphereLight(0xffffff, 0x444444, 1)
    scene.add(light)

    const geometry = new THREE.BoxGeometry(1, 1.6, 0.5)
    const material = new THREE.MeshStandardMaterial({ color: 0x3b82f6 })
    const avatar = new THREE.Mesh(geometry, material)
    scene.add(avatar)

    let frameId: number
    const animate = () => {
      avatar.rotation.y += 0.01
      renderer.render(scene, camera)
      frameId = requestAnimationFrame(animate)
    }
    frameId = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(frameId)
      renderer.dispose()
      mount.removeChild(renderer.domElement)
    }
  }, [])

  return <div ref={mountRef} style={{ width: 120, height: 120 }} />
}

export default AvatarCanvas
