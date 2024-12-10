import * as THREE from 'three';

// parameters - ajout du canvas + extension permet d'éviter des soucis selon Bruno Simon
const canvas = document.querySelector('canvas.bg');

// Scene 
const scene = new THREE.Scene();
// Geometry
const geometry = new THREE.BoxGeometry(1, 1, 1); // width, height, depth
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// sizes - avec objet pour organiser
const sizes = {
    width: 800,
    height: 600
};

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width/ sizes.height);
camera.position.z = 3;
scene.add(camera);

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas // on peut mettre juste canvas quand variable = propriété mais pas top en lecture pour apprendre avec objets
});
renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);

