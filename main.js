import "./style.css";
import "materialize-css";
import "materialize-css/dist/css/materialize.min.css";

import * as THREE from "three";

import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

// Setup

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#bg"),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);
camera.position.setX(-3);

renderer.render(scene, camera);

// Torus

// const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
// const material = new THREE.MeshStandardMaterial({ color: 0xff6347 });
// const torus = new THREE.Mesh(geometry, material);

// scene.add(torus);

// Lights

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5, 5, 5);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

// Helpers

// const lightHelper = new THREE.PointLightHelper(pointLight)
// const gridHelper = new THREE.GridHelper(200, 50);
// scene.add(lightHelper, gridHelper)

// const controls = new OrbitControls(camera, renderer.domElement);

// Background

const tableTexture = new THREE.TextureLoader().load("pokertable.jpg");
scene.background = tableTexture;

// Avatar

const firstCardTexture = new THREE.TextureLoader().load("1.png");

const firstCard = new THREE.Mesh(
  new THREE.BoxGeometry(3, 3, 3),
  new THREE.MeshBasicMaterial({ map: firstCardTexture })
);

scene.add(firstCard);



// Moon

const moonTexture = new THREE.TextureLoader().load("moon.jpg");
const normalTexture = new THREE.TextureLoader().load("normal.jpg");

const moon = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial({
    map: moonTexture,
    normalMap: normalTexture,
  })
);

scene.add(moon);

moon.position.z = 0;
moon.position.x = 2;

firstCard.position.z = 25;
firstCard.position.x = 2;



// Animation Loop

function animate() {
  requestAnimationFrame(animate);

  //   torus.rotation.x += 0.01;
  //   torus.rotation.y += 0.005;
  //   torus.rotation.z += 0.01;

  moon.rotation.x += 0.005;

  // controls.update();

  renderer.render(scene, camera);
}

animate();

function makeButton(name, onclick) {
  let button = document.createElement("a");
  button.classList.add("waves-effect", "waves-light", "btn");
  button.innerHTML = name;
  button.onclick = onclick;

  let buttons = document.querySelector("#buttons");
  buttons.appendChild(button);
}

function sayHello() {
  alert("Hello!");
}

async function sayClassy() {
  let resp = await fetch("/api/state");
  console.log(await resp.json());
}

function connect() {
  let ws = new WebSocket(`ws://localhost:3000/ws/test`);
  ws.onmessage = function (event) {
    console.log(event);
  };
  ws.onclose = function (event) {
    console.log(event);
  };
}

makeButton("Hello", sayHello);
makeButton("Fetch", sayClassy);
makeButton("Connect", connect);