var objloaderapp = (function () {
    var Validator = THREE.LoaderSupport.Validator;

    function objloaderapp(bindElement) {
        this.renderer = null;
        this.canvas = bindElement;
        this.aspectRatio = 1;
        this.recalcAspectRatio();

        this.scene = null;

        this.cameraDefaults = {
            posCamera: new THREE.Vector3(0.0, 175.0, 500.0),
            posCameraTarget: new THREE.Vector3(0, 0, 0),
            near: 0.1,
            far: 10000,
            fov: 45
        };
        this.camera = null;
        this.cameraTarget = this.cameraDefaults.posCameraTarget;

        this.controls = null;
    }

    objloaderapp.prototype.initThree = function () {
        this.renderer = new THREE.WebGLRenderer({
            canvas: this.canvas,
            antialias: true,
            autoClear: true
        });
        this.renderer.setClearColor(0x050505);
    };

    objloaderapp.prototype.initScene = function () {
        this.scene = new THREE.Scene();
        this.scene.fog = new THREE.Fog(0xa0a0a0, 200, 1000);

    };

    objloaderapp.prototype.initCamera = function () {
        this.camera = new THREE.PerspectiveCamera(this.cameraDefaults.fov, this.aspectRatio, this.cameraDefaults.near, this.cameraDefaults.far);
        this.resetCamera();
    };

    objloaderapp.prototype.initControls = function () {
        this.controls = new THREE.TrackballControls(this.camera, this.renderer.domElement);
    };

    objloaderapp.prototype.initLight = function () {
        var ambientLight = new THREE.AmbientLight(0x404040);
        var directionalLight1 = new THREE.DirectionalLight(0xC0C090);
        var directionalLight2 = new THREE.DirectionalLight(0xC0C090);

        directionalLight1.position.set(-100, -50, 100);
        directionalLight2.position.set(100, 50, -100);

        var hemispherelight = new THREE.HemisphereLight(0xffffff, 0x444444);
        hemispherelight.position.set(0, 200, 0);

        this.scene.add(hemispherelight);
        this.scene.add(directionalLight1);
        this.scene.add(directionalLight2);
        this.scene.add(ambientLight);
    };

    objloaderapp.prototype.initHelper = function () {
        //var helper = new THREE.GridHelper(1200, 60, 0xFF4444, 0x404040);
        //this.scene.add(helper);

        var grid = new THREE.GridHelper(2000, 20, 0x000000, 0x000000);
        grid.material.opacity = 0.2;
        grid.material.transparent = true;
        this.scene.add(grid);
    };

    objloaderapp.prototype.initObject = function () {
        // ground
        var mesh = new THREE.Mesh(new THREE.PlaneGeometry(2000, 2000), new THREE.MeshPhongMaterial({
            color: 0x5f5f5f,
            depthWrite: false
        }));
        mesh.rotation.x = -Math.PI / 2;
        mesh.receiveShadow = true;
        this.scene.add(mesh);
    };

    objloaderapp.prototype.initContent = function () {
        var modelName = 'female02';
        this._reportProgress({detail: {text: 'Loading: ' + modelName}});

        var scope = this;
        var objLoader = new THREE.OBJLoader2();
        var callbackOnLoad = function (event) {
            scope.scene.add(event.detail.loaderRootNode);
            console.log('Loading complete: ' + event.detail.modelName);
            scope._reportProgress({detail: {text: ''}});
        };
        // var onLoadMtl = function (materials) {
        //     objLoader.setModelName(modelName);
        //     objLoader.setMaterials(materials);
        //     objLoader.setLogging(true, true);
        //     objLoader.load(this.canvas.id, callbackOnLoad, null, null, null, false);
        // };
        // objLoader.loadMtl('models/obj/female02/female02.mtl', null, onLoadMtl);

        //var materials = new THREE.MeshLambertMaterial({color: Math.random() * 0xffffff});
        var materials = new THREE.MeshNormalMaterial( { overdraw: 0.5 } );
        objLoader.setModelName(modelName);
        objLoader.setMaterials(materials);
        objLoader.setLogging(true, true);
        objLoader.load(this.canvas.id, callbackOnLoad, null, null, null, false);
    };

    objloaderapp.prototype._reportProgress = function (event) {
        var output = Validator.verifyInput(event.detail.text, '');
        console.log('Progress: ' + output);
        document.getElementById('feedback').innerHTML = output;
    };

    objloaderapp.prototype.resizeDisplayGL = function () {
        this.controls.handleResize();

        this.recalcAspectRatio();
        this.renderer.setSize(this.canvas.offsetWidth, this.canvas.offsetHeight, false);

        this.updateCamera();
    };

    objloaderapp.prototype.recalcAspectRatio = function () {
        this.aspectRatio = ( this.canvas.offsetHeight === 0 ) ? 1 : this.canvas.offsetWidth / this.canvas.offsetHeight;
    };

    objloaderapp.prototype.resetCamera = function () {
        this.camera.position.copy(this.cameraDefaults.posCamera);
        this.cameraTarget.copy(this.cameraDefaults.posCameraTarget);

        this.updateCamera();
    };

    objloaderapp.prototype.updateCamera = function () {
        this.camera.aspect = this.aspectRatio;
        this.camera.lookAt(this.cameraTarget);
        this.camera.updateProjectionMatrix();
    };

    objloaderapp.prototype.render = function () {
        if (!this.renderer.autoClear) this.renderer.clear();
        this.controls.update();
        this.renderer.render(this.scene, this.camera);
    };
    return objloaderapp;
})();

var canvas = document.getElementsByClassName('modeldetail');
var container = canvas[0];

var app = new objloaderapp(container);

var resizeWindow = function () {
    app.resizeDisplayGL();
};

var render = function () {
    requestAnimationFrame(render);
    app.render();
};

window.addEventListener('resize', resizeWindow, false);

console.log('Starting initialisation phase...');
app.initThree();
app.initScene();
app.initCamera();
app.initLight();
app.initHelper();
app.initControls();
app.initObject();
app.resizeDisplayGL();
app.initContent();

render();