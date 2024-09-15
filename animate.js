const scene = new THREE.Scene();
const texLoader = new THREE.TextureLoader();
const texture = texLoader.load("1B1B1B_999999_575757_747474.png");
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight
);

camera.position.z = 3;

scene.add(camera);

const geometry = new THREE.IcosahedronGeometry(1.25);
const material = new THREE.MeshMatcapMaterial({ matcap: texture });
const cube = new THREE.Mesh(geometry, material);
cube.rotation.x = 0;

scene.add(cube);

const renderer = new THREE.WebGLRenderer({
  canvas: threeCanvas,
  alpha: true,
  antialias: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);

////// Mouse Move Interactivity

window.addEventListener("resize", (event) => {
  camera.aspect = window.innerWidth / window.innerHeight;

  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
});

////// Mouse Move Interactivity

const cursor = { x: 0, y: 0 };

window.addEventListener("mousemove", (event) => {
  cursor.x = event.x / window.innerWidth - 0.5;
  console.log(cursor.x);
});

///// Scroll Interactivity

let ScrollPosition = 0;

document.addEventListener("scroll", (event) => {
  ScrollPosition = window.scrollY / 400;
  console.log(ScrollPosition);
});

const draw = () => {
  camera.position.y += ScrollPosition - camera.position.y;
  camera.position.x += (-cursor.x - camera.position.x) / 10;
  cube.rotation.x += 0.005;
  renderer.render(scene, camera);
  window.requestAnimationFrame(draw);
};

draw();
