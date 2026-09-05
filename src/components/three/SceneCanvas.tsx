import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useRef, useMemo, Suspense, useEffect } from 'react'
import * as THREE from 'three'
import { useScrollProgress } from '@hooks/useScrollProgress'
import { useReducedMotion } from '@hooks/useReducedMotion'

// ─── Octahedron wireframe mesh ───────────────────────────────────────────────
function OctahedronMesh() {
  const meshRef = useRef<THREE.Mesh>(null)
  const wireRef = useRef<THREE.LineSegments>(null)
  const groupRef = useRef<THREE.Group>(null)
  const scroll = useScrollProgress()
  const { size } = useThree()

  // Build geometry once
  const { solidGeo, wireGeo } = useMemo(() => {
    const solidGeo = new THREE.OctahedronGeometry(1.6, 0)
    const wireGeo = new THREE.WireframeGeometry(solidGeo)
    return { solidGeo, wireGeo }
  }, [])

  // Materials
  const solidMat = useMemo(() => new THREE.MeshBasicMaterial({
    color: '#E8821C',
    transparent: true,
    opacity: 0.04,
    side: THREE.DoubleSide,
  }), [])

  const wireMat = useMemo(() => new THREE.LineBasicMaterial({
    color: '#E8821C',
    transparent: true,
    opacity: 0.7,
  }), [])

  // Scroll-driven animation
  useFrame((state, delta) => {
    if (!groupRef.current) return
    const t = scroll // 0→1

    // Position: drifts from centre-left → right → top-right
    const x = THREE.MathUtils.lerp(-1.5, 2.5, t)
    const y = THREE.MathUtils.lerp(0.5, 1.5, Math.sin(t * Math.PI))
    const z = 0

    // Scale: large at start, shrinks through journey, grows slightly at end
    const scale = THREE.MathUtils.lerp(1.2, 0.5, t < 0.5 ? t * 1.2 : 0.6 + (t - 0.5) * 0.2)

    groupRef.current.position.x = x
    groupRef.current.position.y = y
    groupRef.current.scale.setScalar(scale)

    // Continuous auto-rotation (slow)
    if (meshRef.current && wireRef.current) {
      meshRef.current.rotation.x += delta * 0.25
      meshRef.current.rotation.y += delta * 0.4
      wireRef.current.rotation.x = meshRef.current.rotation.x
      wireRef.current.rotation.y = meshRef.current.rotation.y

      // At ~40% scroll (Experience), glow brighter
      const glowT = Math.max(0, 1 - Math.abs(t - 0.4) / 0.15)
      wireMat.opacity = 0.55 + glowT * 0.45
      solidMat.opacity = 0.04 + glowT * 0.08
    }
  })

  return (
    <group ref={groupRef} position={[-1.5, 0.5, 0]}>
      <mesh ref={meshRef} geometry={solidGeo} material={solidMat} />
      <lineSegments ref={wireRef} geometry={wireGeo} material={wireMat} />
    </group>
  )
}

// ─── Inner scene (handles reduced-motion static version) ─────────────────────
function Scene() {
  const reduced = useReducedMotion()
  const meshRef = useRef<THREE.Mesh>(null)

  const { solidGeo, wireGeo } = useMemo(() => {
    const solidGeo = new THREE.OctahedronGeometry(1.6, 0)
    const wireGeo = new THREE.WireframeGeometry(solidGeo)
    return { solidGeo, wireGeo }
  }, [])

  const solidMat = useMemo(() => new THREE.MeshBasicMaterial({
    color: '#E8821C', transparent: true, opacity: 0.04, side: THREE.DoubleSide,
  }), [])

  const wireMat = useMemo(() => new THREE.LineBasicMaterial({
    color: '#E8821C', transparent: true, opacity: 0.55,
  }), [])

  useFrame((_, delta) => {
    if (reduced || !meshRef.current) return
    meshRef.current.rotation.x += delta * 0.2
    meshRef.current.rotation.y += delta * 0.35
  })

  if (reduced) {
    // Static octahedron for reduced-motion users
    return (
      <group position={[-1, 0, 0]}>
        <mesh geometry={solidGeo} material={solidMat} rotation={[0.4, 0.4, 0]} />
        <lineSegments geometry={wireGeo} material={wireMat} rotation={[0.4, 0.4, 0]} />
      </group>
    )
  }

  return <OctahedronMesh />
}

// ─── Exported canvas layer ────────────────────────────────────────────────────
export default function SceneCanvas() {
  // Hide on mobile (performance)
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768

  if (isMobile) return null

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0"
      style={{ willChange: 'transform' }}
    >
      <Canvas
        camera={{ position: [0, 0, 7], fov: 45 }}
        dpr={[1, 1.5]}
        frameloop="always"
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  )
}
