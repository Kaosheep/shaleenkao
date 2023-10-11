import * as THREE from "https://cdn.skypack.dev/three@0.129.0/build/three.module.js";
import { OrbitControls } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js";
import gsap from 'https://cdn.skypack.dev/gsap';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, 600 / 500, 0.1, 1000);

let mouseX = window.innerWidth / 100;
let mouseY = window.innerHeight / 100;

let object;
let controls;
let mixer;

const loader = new GLTFLoader();

loader.load(
  `image/sheepmove.gltf`,
  function (gltf) {
    object = gltf.scene;
    scene.add(object);

    object.position.y = -0.3;
    mixer = new THREE.AnimationMixer(object);
    const clips = gltf.animations;
    clips.forEach(function (clip) {
      const action = mixer.clipAction(clip);
      action.play();
    })
    console.log(object)
  },
  function (xhr) {
    console.log((xhr.loaded / xhr.total * 100) + '% loaded');
  },
  function (error) {
    console.error(error);
  }

);

const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(600, 500);

renderer.setClearColor(0xffffff, 0);

document.getElementById("container3D").appendChild(renderer.domElement);

camera.position.set(2, 1, 4);
camera.lookAt(new THREE.Vector3(0, 0, 0));

// let zoom = true;
// document.getElementById('btn').addEventListener('click',()=>{
//   gsap.to(camera.position,{
//       duration:1,
//       z : zoom? 20:4,
//       onUpdate: function() {
//                 camera.lookAt( 0,1,1);
//             },
//   })

//   document.getElementById('btn').innerHTML = zoom?"zoomin" : "zoomout"
//   zoom = !zoom
// })

const topLight = new THREE.DirectionalLight(0xffffff, 0.5);
topLight.position.set(500, 500, 500)
topLight.castShadow = true;
scene.add(topLight);

const ambientLight = new THREE.AmbientLight(0xffffff,1.2);
scene.add(ambientLight);

const clock = new THREE.Clock();

function animate() {
  if (mixer) {
    mixer.update(clock.getDelta()).timeScale = 1 / 2;
  }
  if (object) {
    gsap.to(object.rotation, {
      duration: 1,
      y : mouseX / 3000,
      x : mouseY / 5000,
    })

  }


  renderer.render(scene, camera);


}
renderer.setAnimationLoop(animate);

window.addEventListener("resize", function () {
  camera.aspect = 600 / 500;
  camera.updateProjectionMatrix();
  renderer.setSize(600, 500);
});

document.onmousemove = (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
}

animate();

