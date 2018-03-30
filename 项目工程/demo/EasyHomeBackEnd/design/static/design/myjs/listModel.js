var canvases = document.getElementsByClassName('modeldisplay');
var mouse = new THREE.Vector2();
if (canvases.length > 0) {
    if (!Detector.webgl) Detector.addGetWebGLMessage();
    var width = parseInt($(canvases[0]).css('width'));
    var height = parseInt($(canvases[0]).css('height'));
    var aspect = width / height;


    var offset = new THREE.Vector3(10, 10, 10);
    for (var i = 0, len = canvases.length; i < len; i++) {
        var renderer = new THREE.WebGLRenderer({antialias: true});
        var camera = new THREE.PerspectiveCamera(70, aspect, 1, 10000);
        var scene =  new THREE.Scene();
        var manager = new THREE.LoadingManager();
        var controls = new THREE.TrackballControls(camera);
        initThree(canvases[i], renderer, width, height);
        initScene(scene);
        initCamera(camera, controls);
        initLight(scene);
        initLoader(manager, scene, canvases[i].id);
        renderer.render(scene, camera);
    }
}

function initThree(div, renderer, width, height) {
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.autoClear = false;
    var canvas = renderer.domElement;
    div.appendChild(canvas);
}

function initScene(scene) {
    scene.background = new THREE.Color(0xf0f0f0);
}

function initCamera(camera, controls) {
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

function initLight(scene) {
    /* we need to add a light so we can see our cube - its almost
       as if we're turning on a lightbulb within the room */
    var light = new THREE.PointLight(0xFFFFFF);
    /* position the light so it shines on the cube (x, y, z) */
    light.position.set(125, 125, 125);
    scene.add(light);

    var directlight = new THREE.DirectionalLight(0xffffff, 1);
    directlight.position.set(1, 1, 1).normalize();
    scene.add(directlight);
}

function initLoader(manager, scene, path) {
    manager.onProgress = function ( item, loaded, total ) {
        console.log( item, loaded, total );
    };

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
    loader.load( path, function ( object ) {
        object.traverse( function ( child ) {

            if ( child instanceof THREE.Mesh ) {

            }

        } );
        object.position.y = - 95;
        scene.add( object );

    }, onProgress, onError );

    var helper = new THREE.GridHelper( 1200, 60, 0xFF4444, 0x404040 );
    scene.add( helper );
}


