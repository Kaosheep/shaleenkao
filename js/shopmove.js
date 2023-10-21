import * as THREE from "https://cdn.skypack.dev/three@0.129.0/build/three.module.js";
import { OrbitControls } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js";
import gsap from 'https://cdn.skypack.dev/gsap';
import { ScrollTrigger } from 'https://cdn.skypack.dev/gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);


const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth*0.9 / window.innerHeight, 0.1, 1000);

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

    object.position.y = -1;
    object.translateX(3.5);
    object.position.z = -1.5;
    mixer = new THREE.AnimationMixer(object);
    const clips = gltf.animations;
    clips.forEach(function (clip) {
      const action = mixer.clipAction(clip);
      action.play();
    })

  },
  function (xhr) {
    console.log((xhr.loaded / xhr.total * 100) + '% loaded');
  },
  function (error) {
    console.error(error);
  }

);

const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth*0.9, window.innerHeight);

renderer.setClearColor(0xffffff, 0);
let box = document.getElementById("container3D");
box.appendChild(renderer.domElement);

camera.position.set(5, 1, 5.5);
camera.lookAt(new THREE.Vector3(0, 0, 0));

const topLight = new THREE.DirectionalLight(0xffffff, 0.5);
topLight.position.set(1200, 500, 500)
topLight.castShadow = true;
scene.add(topLight);

const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
scene.add(ambientLight);

const clock = new THREE.Clock();

function animate() {
  if (mixer) {
    mixer.update(clock.getDelta()).timeScale = 1 / 2;
  }
  if (object) {
    gsap.to(object.rotation, {
      duration: 1,
      y: mouseX / 2800,
      x: mouseY / 4000,
    })

  }


  renderer.render(scene, camera);


}
renderer.setAnimationLoop(animate);

window.addEventListener("resize", function () {
  camera.aspect = window.innerWidth*0.9 / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth*0.9, window.innerHeight);
});

document.onmousemove = (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
}

animate();

let sectionh = document.querySelector('section').offsetHeight;
// let tl = gsap.timeline({
  
//   scrollTrigger: {
//     markers: true,
//     scrub: true,
//     start: '0 top',
//     end: `+=${sectionh * 1.6} top`,
//     toggleActions: "restart pause pause pause",
//     onUpdate: function (self) {
//       scene.rotation.y = -1 *Math.sin(Math.PI * 1.3 *self.progress);
//       scene.position.z = -1 * Math.sin(Math.PI * 1 *self.progress) + 7.5 *self.progress;
//       scene.position.x = -7.5 *self.progress;
//     }
//   }
// });

// let tl2 = gsap.timeline({
//   scrollTrigger: {
//     markers: true,
//     scrub: true,
//     start: `+=${sectionh * 2} top`,
//     end: 'bottom bottom',
//     onUpdate: function (self) {
//       camera.position.y = -20 * self.progress;
//     }
//   }
// });








