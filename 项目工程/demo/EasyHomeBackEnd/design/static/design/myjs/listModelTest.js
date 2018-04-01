var canvases = document.getElementsByClassName('modeldisplay');
var width = parseInt($(canvases[0]).css('width'));
var height = parseInt($(canvases[0]).css('height'));
var container;
var aspect = width / height;
var mouse = new THREE.Vector2();

function initThree(renderer) {

    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.autoClear = false;

}

function initCanvas(element, renderer) {
    container = element;
    container.appendChild(renderer.domElement);
}

var camera;

function initCamera() {

    camera = new THREE.PerspectiveCamera(70, aspect, 1, 10000);
    camera.position.x = 0;
    camera.position.y = 0;
    camera.position.z = 200;
    camera.up.x = 0;
    camera.up.y = 1;
    camera.up.z = 0;
    camera.lookAt(new THREE.Vector3(0, 0, 0));

    //controls = new THREE.TrackballControls(camera);
    // controls.rotateSpeed = 1.0;
    // controls.zoomSpeed = 1.2;
    // controls.panSpeed = 0.8;
    // controls.noZoom = false;
    // controls.noPan = false;
    // controls.staticMoving = true;
    // controls.dynamicDampingFactor = 0.3;
}

function initScene(scene) {
    scene.background = new THREE.Color(0xf0f0f0);
}

var light;

function initLight(scene) {
    /* we need to add a light so we can see our cube - its almost
       as if we're turning on a lightbulb within the room */
    light = new THREE.PointLight(0xFFFFFF);
    /* position the light so it shines on the cube (x, y, z) */
    light.position.set(125, 125, 125);
    scene.add(light);

    var directlight = new THREE.DirectionalLight(0xffffff, 1);
    directlight.position.set(1, 1, 1).normalize();
    scene.add(directlight);
}

var manager;

function initLoader(path, scene) {
    manager = new THREE.LoadingManager();
    manager.onProgress = function (item, loaded, total) {
        console.log(item, loaded, total);
    };

    // model

    var onProgress = function (xhr) {
        if (xhr.lengthComputable) {
            var percentComplete = xhr.loaded / xhr.total * 100;
            console.log(Math.round(percentComplete, 2) + '% downloaded');
        }
    };

    var onError = function (xhr) {
    };

    var loader = new THREE.OBJLoader(manager);
    loader.load(path, function (object) {

        object.traverse(function (child) {

            if (child instanceof THREE.Mesh) {

            }

        });

        object.position.y = -95;
        scene.add(object);

    }, onProgress, onError);

}

var cube;

function initObject(scene) {
    var cubegeometry = new THREE.BoxGeometry(20, 20, 20);
    var material = new THREE.MeshLambertMaterial({color: Math.random() * 0xffffff});
    cube = new THREE.Mesh(cubegeometry, material);
    //scene.add(cube);

    var helper = new THREE.GridHelper(1200, 60, 0xFF4444, 0x404040);
    //scene.add(helper);
}

var len = canvases.length;

var renderers = new Array(len);
var scenes = new Array(len);

function animate() {

    requestAnimationFrame(animate);
    render();
}

function render() {

    camera.updateMatrixWorld();
    //controls.update();
    for (var i = 0; i < len; i++) {
        if (renderers[i]) {
            renderers[i].clear();
            renderers[i].render(scenes[i], camera);
        }
    }

}


function addEvents() {
    document.addEventListener('mousemove', onDocumentMouseMove, false);
    window.addEventListener('resize', onWindowResize, false);
}

function onWindowResize(event) {

    width = parseInt($(canvases[0]).css('width'));
    height = parseInt($(canvases[0]).css('height'));
    aspect = width / height;

    renderer.setSize(width, height);
    camera.updateProjectionMatrix();

}

function onDocumentMouseMove(event) {

    mouse.x = (event.clientX / parseInt($(canvases[0]).css('width'))) * 2 - 1;
    mouse.y = -(event.clientY / parseInt($(canvases[0]).css('height'))) * 2 + 1;

}

if(len > 0){
    for (var i = 0; i < len; i++) {
    renderers[i] = new THREE.WebGLRenderer({antialias: true});
    initThree(renderers[i]);
    initCanvas(canvases[i], renderers[i]);
    scenes[i] = new THREE.Scene();
    initScene(scenes[i]);
    initCamera();
    initLight(scenes[i]);
    initLoader(canvases[i].id, scenes[i]);
    initObject(scenes[i]);
    //addEvents();
    animate();
}
}

