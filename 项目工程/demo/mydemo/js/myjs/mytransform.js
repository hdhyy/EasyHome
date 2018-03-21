var renderer;
var SCREEN_WIDTH = window.innerWidth;
var SCREEN_HEIGHT = window.innerHeight;
var aspect = SCREEN_WIDTH / SCREEN_HEIGHT;
var control;
function initThree() {

    renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.autoClear = false;

    document.body.appendChild(renderer.domElement);
    //renderer.setClearColor(0xFFFFFF, 1.0);
}

var camera;

function initCamera() {

    camera = new THREE.PerspectiveCamera(50, aspect, 1, 10000);
    camera.position.x = 0;
    camera.position.y = 0;
    camera.position.z = 1000;
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
    light = new THREE.PointLight(0xFFFFFF);
    /* position the light so it shines on the cube (x, y, z) */
    light.position.set(125, 125, 125);
    scene.add(light);
}

var cube;

function initObject() {
    var geometry = new THREE.BoxGeometry(100, 100, 100);
    var material = new THREE.MeshLambertMaterial({color: 0xFFFFFF});
    cube = new THREE.Mesh(geometry, material);
    scene.add(cube);
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
    // cube.rotation.x += 0.01;
    // cube.rotation.y += 0.01;

    control.update();
    renderer.clear();

    renderer.render( scene, camera );


}

function initControl() {
    control = new THREE.TransformControls( camera, renderer.domElement );
    control.attach( cube );
    scene.add(control);
}

function addEvents() {

    control.addEventListener( 'change', render );

    window.addEventListener( 'resize', onWindowResize, false );
    window.addEventListener( 'keydown', function ( event ) {

        switch ( event.keyCode ) {

            case 81: // Q
                control.setSpace( control.space === "local" ? "world" : "local" );
                break;

            case 17: // Ctrl
                control.setTranslationSnap( 100 );
                control.setRotationSnap( THREE.Math.degToRad( 15 ) );
                break;

            case 87: // W
                control.setMode( "translate" );
                break;

            case 69: // E
                control.setMode( "rotate" );
                break;

            case 82: // R
                control.setMode( "scale" );
                break;

            case 187:
            case 107: // +, =, num+
                control.setSize( control.size + 0.1 );
                break;

            case 189:
            case 109: // -, _, num-
                control.setSize( Math.max( control.size - 0.1, 0.1 ) );
                break;

        }
    });
    window.addEventListener( 'keyup', function ( event ) {

        switch ( event.keyCode ) {

            case 17: // Ctrl
                control.setTranslationSnap( null );
                control.setRotationSnap( null );
                break;

        }

    });
}

function onWindowResize( event ) {

    SCREEN_WIDTH = window.innerWidth;
    SCREEN_HEIGHT = window.innerHeight;
    aspect = SCREEN_WIDTH / SCREEN_HEIGHT;

    renderer.setSize( SCREEN_WIDTH, SCREEN_HEIGHT );

    camera.aspect = 0.5 * aspect;
    camera.updateProjectionMatrix();

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