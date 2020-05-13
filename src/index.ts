import * as THREE from 'three'
import { OrbitControls } from 'three-orbitcontrols-ts'

const width = 900
const height = 900
const scene = new THREE.Scene()

// mesh
const colorBlue = 0x43aad9
const geometry = new THREE.TorusKnotBufferGeometry(10, 3, 64, 8, 2, 3)
const material = new THREE.MeshStandardMaterial({
  color: colorBlue,
  emissive: colorBlue + 0xf0f0f0,
  roughness: 0.6,
  metalness: 0.6,
  flatShading: true,
})

geometry.computeVertexNormals()

const box = new THREE.Mesh(geometry, material)
scene.add(box)

// Wireframe
const geo = new THREE.EdgesGeometry(geometry)
const mat = new THREE.LineBasicMaterial({ color: 0xffffff, linewidth: 10 })
const wireframe = new THREE.LineSegments(geo, mat)
scene.add(wireframe)

const camera = new THREE.PerspectiveCamera(45, 1, 1, 10000)
camera.position.set(0, 0, 50)

// 平行光源
const directionalLight = new THREE.DirectionalLight(0xffffff)
directionalLight.position.set(1, 1, 1)
// シーンに追加
scene.add(directionalLight)

// render
const renderer = new THREE.WebGLRenderer({
  alpha: true,
  antialias: true,
})
renderer.setSize(width, height)
renderer.setClearColor(0xffffff)
document.body.appendChild(renderer.domElement)
renderer.render(scene, camera)

const controls = new OrbitControls(camera, renderer.domElement)

function render(): void {
  requestAnimationFrame(render)
  renderer.render(scene, camera)
  controls.update()
}

render()
