import * as THREE from 'three'
import gsap from 'gsap'
import GUI from 'lil-gui'


console.log(THREE)
// Scene
const scene = new THREE.Scene()
// Object
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 'red' })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)
console.log('scene',scene);
// Sizes
const sizes = {
  width: 800,
  height: 600
}
// Camera 视野 纵横比 近点 远点
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 1, 1000)
camera.position.z = 3
camera.lookAt(mesh.position)
scene.add(camera)
// Canvas
const canvas = document.querySelector('canvas.webgl')
// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.render(scene, camera)
/**
 * Animate
 */

// gsap.to(mesh.position, { duration: 1, delay: 1, x: 2 })
//
// const tick = () =>
// {
//
//   // Render
//   renderer.render(scene, camera)
//
//   // Call tick again on the next frame
//   window.requestAnimationFrame(tick)
// }
//
// tick()

// Cursor
const cursor = {
  x: 0,
  y: 0
}

window.addEventListener('mousemove', (event) =>
{
  cursor.x = event.clientX / sizes.width - 0.5
  cursor.y = event.clientY / sizes.height - 0.5
  console.log(event.clientX, event.clientY)
})
const tick = () =>
{

  // Render
  renderer.render(scene, camera)
  // Update camera
  camera.position.x = cursor.x
  camera.position.y = cursor.y
  // Call tick again on the next frame
  window.requestAnimationFrame(tick)
}

tick()
/**
 * Debug
 */
const gui = new GUI()
gui.add(mesh.position, 'y', - 3, 3, 0.01)
gui.addColor(material, 'color')
