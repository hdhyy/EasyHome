if (!Detector.webgl) Detector.addGetWebGLMessage();
var renderer;
var SCREEN_WIDTH = window.innerWidth;
var SCREEN_HEIGHT = window.innerHeight;
var aspect = SCREEN_WIDTH / SCREEN_HEIGHT;
var control;
var container, stats, raycaster;
var radius = 100, theta = 0;

var mouse = new THREE.Vector2();
var offset = new THREE.Vector3(10, 10, 10);
var controls;
var div = document.getElementsByClassName('modeldisplay');

function initThree() {

    renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.autoClear = false;
    container = div[0];
    container.appendChild(renderer.domElement);
    stats = new Stats();
    container.appendChild(stats.dom);

    raycaster = new THREE.Raycaster();
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

    controls = new THREE.TrackballControls(camera);
    controls.rotateSpeed = 1.0;
    controls.zoomSpeed = 1.2;
    controls.panSpeed = 0.8;
    controls.noZoom = false;
    controls.noPan = false;
    controls.staticMoving = true;
    controls.dynamicDampingFactor = 0.3;
}


var scene;

function initScene() {
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf0f0f0);
}

var light;

function initLight() {
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
var textureLoader, texture;
function initLoader() {
    manager = new THREE.LoadingManager();
    manager.onProgress = function ( item, loaded, total ) {
        console.log( item, loaded, total );
    };

    textureLoader = new THREE.TextureLoader( manager );
    texture = textureLoader.load( 'textures/UV_Grid_Sm.jpg' );

    // model

    var onProgress = function ( xhr ) {
        if ( xhr.lengthComputable ) {
            var percentComplete = xhr.loaded / xhr.total * 100;
            console.log( Math.round(percentComplete, 2) + '% downloaded' );
        }
    };

    var onError = function ( xhr ) {
    };

    var loader = new THREE.OBJLoader( manager );
    loader.load( div[0].id, function ( object ) {

        object.traverse( function ( child ) {

            if ( child instanceof THREE.Mesh ) {

                child.material.map = texture;

            }

        } );

        object.position.y = - 95;
        scene.add( object );

    }, onProgress, onError );

}

var cube;

function initObject() {
    var cubegeometry = new THREE.BoxGeometry(20, 20, 20);
    var material = new THREE.MeshLambertMaterial({color: Math.random() * 0xffffff});
    cube = new THREE.Mesh(cubegeometry, material);
    scene.add(cube);

    var helper = new THREE.GridHelper( 1200, 60, 0xFF4444, 0x404040 );
    this.scene.add( helper );
}

function animate() {

    requestAnimationFrame(animate);
    render();
    stats.update();
}

var intersects;

function render() {
    camera.lookAt(scene.position);

    camera.updateMatrixWorld();
    controls.update();

    control.update();
    renderer.clear();
    renderer.render(scene, camera);
}

function initControl() {
    control = new THREE.TransformControls(camera, renderer.domElement);
    //control.attach( cube );
    scene.add(control);
}

function addEvents() {

    control.addEventListener('change', render);
    document.addEventListener('mousemove', onDocumentMouseMove, false);

    window.addEventListener('resize', onWindowResize, false);
    window.addEventListener('keydown', function (event) {

        switch (event.keyCode) {

            case 81: // Q
                control.setSpace(control.space === "local" ? "world" : "local");
                break;

            case 17: // Ctrl
                control.setTranslationSnap(100);
                control.setRotationSnap(THREE.Math.degToRad(15));
                break;

            case 87: // W
                control.setMode("translate");
                break;

            case 69: // E
                control.setMode("rotate");
                break;

            case 82: // R
                control.setMode("scale");
                break;

            case 187:
            case 107: // +, =, num+
                control.setSize(control.size + 0.1);
                break;

            case 189:
            case 109: // -, _, num-
                control.setSize(Math.max(control.size - 0.1, 0.1));
                break;

        }
    });
    window.addEventListener('keyup', function (event) {

        switch (event.keyCode) {

            case 17: // Ctrl
                control.setTranslationSnap(null);
                control.setRotationSnap(null);
                break;
        }

    });
}

function onWindowResize(event) {

    SCREEN_WIDTH = window.innerWidth;
    SCREEN_HEIGHT = window.innerHeight;
    aspect = SCREEN_WIDTH / SCREEN_HEIGHT;

    renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);

    camera.updateProjectionMatrix();

}

function onDocumentMouseMove(event) {

    event.preventDefault();

    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

}

function threeStart() {

    initThree();
    initScene();
    initCamera();
    initLight();
    initLoader();
    initObject();
    initControl();
    addEvents();
    animate();
}

threeStart()