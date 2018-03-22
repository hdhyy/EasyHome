if (!Detector.webgl) Detector.addGetWebGLMessage();
var renderer;
var SCREEN_WIDTH = window.innerWidth;
var SCREEN_HEIGHT = window.innerHeight;
var aspect = SCREEN_WIDTH / SCREEN_HEIGHT;
var control;
var container, stats, raycaster;
var radius = 100, theta = 0;

var mouse = new THREE.Vector2(), INTERSECTED, SELECTED;
var pickingData = [], pickingTexture, pickingScene;
var offset = new THREE.Vector3(10, 10, 10);
var controls;

function initThree() {

    renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.autoClear = false;

    container = document.createElement('div');
    document.body.appendChild(container);
    container.appendChild(renderer.domElement);
    stats = new Stats();
    container.appendChild(stats.dom);

    raycaster = new THREE.Raycaster();


    //renderer.setClearColor(0xFFFFFF, 1.0);
}

var camera;

function initCamera() {

    camera = new THREE.PerspectiveCamera(70, aspect, 1, 10000);
    camera.position.x = 0;
    camera.position.y = 0;
    camera.position.z = 500;
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

var cube;
var highlightBox;

function initObject() {
    var cubegeometry = new THREE.BoxGeometry(20, 20, 20);
    var material = new THREE.MeshLambertMaterial({color: Math.random() * 0xffffff});
    cube = new THREE.Mesh(cubegeometry, material);
    scene.add(cube);

    for (var i = 0; i < 200; i++) {

        var object = new THREE.Mesh(cubegeometry, new THREE.MeshLambertMaterial({color: Math.random() * 0xffffff}));

        object.position.x = Math.random() * 800 - 400;
        object.position.y = Math.random() * 800 - 400;
        object.position.z = Math.random() * 800 - 400;

        object.rotation.x = Math.random() * 2 * Math.PI;
        object.rotation.y = Math.random() * 2 * Math.PI;
        object.rotation.z = Math.random() * 2 * Math.PI;

        object.scale.x = Math.random() + 0.5;
        object.scale.y = Math.random() + 0.5;
        object.scale.z = Math.random() + 0.5;

        scene.add(object);

    }
    // var geometry = new THREE.Geometry(),
    //     pickingGeometry = new THREE.Geometry(),
    //     pickingMaterial = new THREE.MeshBasicMaterial({vertexColors: THREE.VertexColors}),
    //     defaultMaterial = new THREE.MeshPhongMaterial({
    //         color: 0xffffff,
    //         flatShading: true,
    //         vertexColors: THREE.VertexColors,
    //         shininess: 0
    //     });

    highlightBox = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshLambertMaterial({color: 0xffff00}
        ));
    scene.add(highlightBox);
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
    // find intersections
    raycaster.setFromCamera(mouse, camera);

    intersects = raycaster.intersectObjects(scene.children);

    if (intersects.length > 0) {

        if (INTERSECTED != intersects[0].object) {

            if (INTERSECTED) {
                if (SELECTED != INTERSECTED) {
                    INTERSECTED.material.emissive.setHex(INTERSECTED.currentHex);
                }
            }

            INTERSECTED = intersects[0].object;
            if (SELECTED != INTERSECTED) {

                INTERSECTED.currentHex = INTERSECTED.material.emissive.getHex();
                INTERSECTED.material.emissive.setHex(0xff0000);
            } else {
                INTERSECTED.currentHex = SELECTED.currentHex;
            }

        }
    } else {

        if (INTERSECTED) {
            if (SELECTED != INTERSECTED) {
                INTERSECTED.material.emissive.setHex(INTERSECTED.currentHex);
            }
        }
        INTERSECTED = null;

    }

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
    document.addEventListener('mousedown', onDocumentMouseDown, false);

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

function onDocumentMouseDown(event) {

    event.preventDefault();

    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    if (intersects.length > 0) {
        if (SELECTED != intersects[0].object) {
            if (SELECTED) SELECTED.material.emissive.setHex(SELECTED.currentHex);

            SELECTED = intersects[0].object;
            SELECTED.currentHex = INTERSECTED.currentHex;
            SELECTED.material.emissive.setHex(0x00ff00);
        } else {
            if (SELECTED) SELECTED.material.emissive.setHex(0xff0000);
            SELECTED = null;
        }
    } else {
        if (SELECTED) SELECTED.material.emissive.setHex(SELECTED.currentHex);
        SELECTED = null;
    }
    if (SELECTED) {
        control.attach(SELECTED);
    }
}

function threeStart() {

    initThree();
    initScene();
    initCamera();
    initLight();
    initObject();
    initControl();
    addEvents();
    animate();
}

threeStart()