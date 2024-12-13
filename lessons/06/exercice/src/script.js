import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
// can use 'addons' to replace 'examples/jsm' but it's the same -> just a shortcut

/**
 * Cursor
 */
// Better to store inside objects !!
const cursor = { 
    x: 0,
    y: 0
 };
window.addEventListener('mousemove', (event) => 
{
    cursor.x = event.clientX / sizes.width - 0.5;
    cursor.y = - (event.clientY / sizes.height - 0.5);
});

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Sizes
const sizes = {
    width: 800,
    height: 600
}

// Scene
const scene = new THREE.Scene()

// Object
const mesh = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1, 5, 5, 5),
    new THREE.MeshBasicMaterial({ color: 0xff0000 })
)
scene.add(mesh)

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100) 
// Do not use extreme values for near and far (the last 2 parameters of the camera) to prevent z-fighting. The GPU will struggle to understand what's in front or not. 

// Orthographic camera = object will have the same size no matter the distance from the camera 

// const aspectRatio= sizes.width / sizes.height;
// console.log(aspectRatio);
// const camera = new THREE.OrthographicCamera(- 1 * aspectRatio, 1 * aspectRatio, 1, -1, 0.1, 100);
// We need to use the canvas ratio (width/height) to have a good visual that respect the aspect of the object (the render is always a rectangle)

// camera.position.x = 2
// camera.position.y = 2
camera.position.z = 3
console.log(camera.position.length())
camera.lookAt(mesh.position)
scene.add(camera)

// ORBIT CONTROLS
const controls = new OrbitControls(camera, canvas); // Canvas is already defined ;

/**  By default the camera is looking at the center of the scene 
 *  We can change the target property (Vector 3)
        controls.target.y = 1;
        controls.update()
 * */

// DAMPING
//  --> It will smooth the animation by adding some acceleration and friction. 
//  To enable it, we switch the enableDamping property to 'true'
controls.enableDamping = true;
// BE CAREFUL : IT NEED TO BE UPDATED ON EACH FRAME !! SO WE PUT THE 'controls.update()' inside the function with requestAnimationFrame

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)

// Animate
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update objects
    // mesh.rotation.y = elapsedTime;

    // Update camera
    // camera.position.x = cursor.x * 10;
    // camera.position.y = cursor.y * 10;

    // perfect revolution around the object
    // the last '* 3' is for the distance to the camera 
    // Remember : Math.PI * 2 = full revolution of the object
    // camera.position.x = Math.sin(cursor.x * (Math.PI * 2)) * 3;
    // camera.position.z = Math.cos(cursor.x * (Math.PI * 2)) * 3;
    // camera.position.y = cursor.y * 5;

    // lookAt always after the position
    // camera.lookAt(mesh.position)

    // DAMPING
    controls.update();


    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()


// NOTE PART 
// We're not supposed to use the camera directly (abstract object) 

/** BUILD-IND CONTROLS
 * 
 * FLY CONTROLS -> enable moving camera like if you were on a spaceship -> Can rotate on 3 axes, go forward and backward
 * 
 * FIRST PERSON CONTROLS -> Like Fly controls but without the UP axe
 * 
 * POINTER LOCK CONTROLS -> Pointer lock JS API is better because easier to use 
 * 
 * ORBIT CONTROLS -> Can move and rotate / can't below and above angles / Can zoom in and zoom out -> It's all about camera movement 
 * It cannot be access with THREE.OrbitControls -> It's not inside the variable so we have to import a module inside node and use the path (Go on top of the script to see it)
 * 
 * TRACKBALL CONTROLS -> Like orbit controls but there's not limit below and above etc etc 
 * 
 * TRANSFORM CONTROLS -> Has nothing to do with camera -> We can move objects (like an editor)
 * 
 * DRAG CONTROLS -> To move objects on a plane facing the camera nothing to do with camera 
 * 
 * */ 