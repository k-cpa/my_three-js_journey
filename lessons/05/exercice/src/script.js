import * as THREE from 'three'
import gsap from 'gsap'

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Object
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

// Sizes
const sizes = {
    width: 800,
    height: 600
}

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 3
scene.add(camera)

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)

// Clock
const clock = new THREE.Clock();

// Library GSAP can be added too 
gsap.to(mesh.position, { duration: 1, delay: 1, x: 2 });
gsap.to(mesh.position, { duration: 1, delay: 2, x: 0 });

//  ANIMATION 
const tick = () => 
{
    // Clock
    const elapsedTime = clock.getElapsedTime();

    // Update object (elapsedTime * Math.PI * 2 = 1 revolution per second)
    // mesh.rotation.y = elapsedTime * Math.PI * 2;

    // Simple math to make animations !! 
    // camera.position.y = Math.sin(elapsedTime);
    // camera.position.x = Math.cos(elapsedTime);

    // To make the camera look at the object
    // camera.lookAt(mesh.position);



    // Render
    renderer.render(scene, camera)
    window.requestAnimationFrame(tick);
}

tick()

// So we have multiple possibilities : libraries / sin or cos ... rotation etc etc etc 
// Complicated animations may need libraries (easy waaaaaay)