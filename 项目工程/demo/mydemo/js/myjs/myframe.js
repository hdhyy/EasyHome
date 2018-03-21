var renderer;
var SCREEN_WIDTH = window.innerWidth;
var SCREEN_HEIGHT = window.innerHeight;
var aspect = SCREEN_WIDTH / SCREEN_HEIGHT;
function initThree() {

    renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.autoClear = false;

    document.body.appendChild(renderer.domElement);
    //renderer.setClearColor(0xFFFFFF, 1.0);
}

var camera;
var cameraPerspective,cameraPerspectiveHelper;
var cameraRig;
function initCamera() {

    cameraPerspective = new THREE.PerspectiveCamera( 50, 0.5*aspect, 150, 1000 );
    cameraPerspectiveHelper = new THREE.CameraHelper( cameraPerspective );

    cameraPerspective.rotation.y = Math.PI;
    scene.add( cameraPerspectiveHelper );

    cameraRig = new THREE.Group();
    cameraRig.add( cameraPerspective );
    scene.add( cameraRig );

    camera = new THREE.PerspectiveCamera(50, 0.5*aspect, 1, 10000);
    camera.position.x = 0;
    camera.position.y = 0;
    camera.position.z = 2000;
    camera.up.x = 0;
    camera.up.y = 1;
    camera.up.z = 0;
    camera.lookAt( new THREE.Vector3( 0, 0, 0 ) );
}

var scene;

function initScene() {
    scene = new THREE.Scene()
}

var light;

function initLight() {
    /* we need to add a light so we can see our cube - its almost
       as if we're turning on a lightbulb within the room */
    light = new THREE.PointLight(0xFFFF00);
    /* position the light so it shines on the cube (x, y, z) */
    light.position.set(0, 0, 125);
    scene.add(light);
}

var cube;

function initObject() {
    var geometry = new THREE.BoxGeometry(100, 100, 100);
    var material = new THREE.MeshLambertMaterial({color: 0xFFFFFF});
    cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    mesh = new THREE.Mesh(
        new THREE.SphereBufferGeometry( 100, 16, 8 ),
        new THREE.MeshBasicMaterial( { color: 0xffffff, wireframe: true } )
    );
    scene.add( mesh );

    var mesh2 = new THREE.Mesh(
        new THREE.SphereBufferGeometry( 50, 16, 8 ),
        new THREE.MeshBasicMaterial( { color: 0x00ff00, wireframe: true } )
    );
    mesh2.position.y = 150;
    mesh.add( mesh2 );

    var mesh3 = new THREE.Mesh(
        new THREE.SphereBufferGeometry( 5, 16, 8 ),
        new THREE.MeshBasicMaterial( { color: 0x0000ff, wireframe: true } )
    );
    mesh3.position.z = 150;
    cameraRig.add( mesh3 );


    var geometry = new THREE.Geometry();

    for ( var i = 0; i < 10000; i ++ ) {

        var vertex = new THREE.Vector3();
        vertex.x = THREE.Math.randFloatSpread( 2000 );
        vertex.y = THREE.Math.randFloatSpread( 2000 );
        vertex.z = THREE.Math.randFloatSpread( 2000 );

        geometry.vertices.push( vertex );

    }

    var particles = new THREE.Points( geometry, new THREE.PointsMaterial( { color: 0x888888 } ) );
    scene.add( particles );
}

function animate() {

    if (Detector.webgl) {
        // Initiate function or other initializations here
        requestAnimationFrame(animate);
        render();
    } else {
        var warning = Detector.getWebGLErrorMessage();
        document.getElementById('container').appendChild(warning);
    }


}

function render() {
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    var r = Date.now() * 0.0005;

    mesh.position.x = 700 * Math.cos( r );
    mesh.position.z = 700 * Math.sin( r );
    mesh.position.y = 700 * Math.sin( r );

    mesh.children[ 0 ].position.x = 70 * Math.cos( 2 * r );
    mesh.children[ 0 ].position.z = 70 * Math.sin( r );


    cameraPerspective.fov = 35 + 30 * Math.sin( 0.5 * r );
    cameraPerspective.far = mesh.position.length();
    cameraPerspective.updateProjectionMatrix();

    cameraPerspectiveHelper.update();
    cameraPerspectiveHelper.visible = true;

    cameraRig.lookAt( mesh.position );

    renderer.clear();

    cameraPerspectiveHelper.visible = false;

    renderer.setViewport( 0, 0, SCREEN_WIDTH/2, SCREEN_HEIGHT );
    renderer.render( scene, cameraPerspective );

    cameraPerspectiveHelper.visible = true;

    renderer.setViewport( SCREEN_WIDTH/2, 0, SCREEN_WIDTH/2, SCREEN_HEIGHT );
    renderer.render( scene, camera );
}

function addEvents() {
    window.addEventListener( 'resize', onWindowResize, false );
}

function onWindowResize( event ) {

    SCREEN_WIDTH = window.innerWidth;
    SCREEN_HEIGHT = window.innerHeight;
    aspect = SCREEN_WIDTH / SCREEN_HEIGHT;

    renderer.setSize( SCREEN_WIDTH, SCREEN_HEIGHT );

    camera.aspect = 0.5 * aspect;
    camera.updateProjectionMatrix();

    cameraPerspective.aspect = 0.5 * aspect;
    cameraPerspective.updateProjectionMatrix();

    // cameraOrtho.left   = - 0.5 * frustumSize * aspect / 2;
    // cameraOrtho.right  =   0.5 * frustumSize * aspect / 2;
    // cameraOrtho.top    =   frustumSize / 2;
    // cameraOrtho.bottom = - frustumSize / 2;
    // cameraOrtho.updateProjectionMatrix();

}

function threeStart() {

    initThree();
    initScene();
    initCamera();
    initLight();
    initObject();
    addEvents();
    animate();
}

threeStart()