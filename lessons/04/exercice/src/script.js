import * as THREE from 'three'

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Objects
 */
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: true })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)
// --------------------------------- POSITION -----------------------------------------------------------------------------------------------------------------
// position
// MEMO : position is a Vector3
mesh.position.x = 0.7
mesh.position.y = -0.6
mesh.position.z = 1
// To use all three position at once in order (x, y, z) - almost no performance difference
mesh.position.set(0.7, -0.6, 1)

// --------------------------------- SCALES -----------------------------------------------------------------------------------------------------------------------
// also Vector3
mesh.scale.x = 2
mesh.scale.y = 0.5
mesh.scale.z = 0.5
// as position we can set all three together
mesh.scale.set(2, 0.5, 0.5)

// --------------------------------- ROTATION -----------------------------------------------------------------------------------------------------------------------
// Two possibilities : rotation and quaternion
// Updating one will update the other

// rotation is a 'Euler' -> it's made to do rotation
// 0 is default value
// Math.PI = 3,14159 (half rotation) so full rotation is PI * 2 // quarter is PI * 0.5 etcetera
// Be careful -> When I rotate on an axis, I might also rotate the other axis. The rotation goes by default in the x, y, z order ...
//  we can have gimbal lock (axis not working). To fix it :
// We can change the order with reorder (place it before your axis rotation):
mesh.rotation.reorder('YXZ')
mesh.rotation.x = Math.PI * 0.25
mesh.rotation.y = Math.PI * 0.25

// --------------------------------- QUATERNION -----------------------------------------------------------------------------------------------------------------------
// Because axis order can be problematic -> Most engines and 3D softwares use Quaternion
// It's like a representation of rotation but in a more mathematical way 
// The Quaternion updates when you change the rotation 



// Axes Helper - For helping us vizualise the axes on the object directly
// Red one = positive x // Green one = positive y // Blue one = positive z 
// Length of visual lines is 1 unit. We can make it smaller or taller with parameters of the new THREE.AxesHelper() -> (2) or (0.5) for exemple
const axesHelper = new THREE.AxesHelper();
scene.add(axesHelper);

// ------------------------------- DIFFERENTE COMMANDES UTILES POUR COMPRENDRE VECTOR 3 -------------------------------------------------------------------------------------------------
// distance between position and center of the scene Vector3
// console.log(mesh.position.length())  

// it takes the vector's length so it become 1 - can be usefull we'll see later why 
// mesh.position.normalize();
// console.log(mesh.position.normalize)

/**
 * Sizes
 */
const sizes = {
    width: 800,
    height: 600
}

/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 3
scene.add(camera)

// --------------------------------- LOOK AT -----------------------------------------------------------------------------------------------------------------------
// By default the camera is facing the center of the scene but we can make it look at the center of the 3D object
// Target must be a Vector3 - 
camera.lookAt(mesh.position)

// distance to the camera
// console.log(mesh.position.distanceTo(camera.position))

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.render(scene, camera)
