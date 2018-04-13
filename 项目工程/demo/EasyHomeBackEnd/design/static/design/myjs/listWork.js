var loadworkapp = (function () {

    function loadworkapp(bindElement, url) {
        this.canvas = bindElement;
        this.url = url;

        this.scene = null;
        this.renderer = null;

        this.aspectRatio = 1;
        this.recalcAspectRatio();

        this.cameraDefaults = {
            posCamera: new THREE.Vector3(0.0, 10.0, 30.0),
            posCameraTarget: new THREE.Vector3(0, 0, 0),
            near: 0.1,
            far: 10000,
            fov: 45
        };
        this.camera = null;
        this.cameraTarget = this.cameraDefaults.posCameraTarget;
    }

    loadworkapp.prototype.recalcAspectRatio = function () {
        this.aspectRatio = ( this.canvas.offsetHeight === 0 ) ? 1 : this.canvas.offsetWidth / this.canvas.offsetHeight;
    };

    loadworkapp.prototype.initThree = function () {
        this.renderer = new THREE.WebGLRenderer({
            canvas: this.canvas,
            antialias: true,
            autoClear: true
        });
        this.renderer.setClearColor(0x050505);
    };

    loadworkapp.prototype.initScene = function () {
        this.scene = new THREE.Scene();
        this.scene.fog = new THREE.Fog(0xa0a0a0, 200, 1000);
    };

    loadworkapp.prototype.initCamera = function () {
        this.camera = new THREE.PerspectiveCamera(this.cameraDefaults.fov, this.aspectRatio, this.cameraDefaults.near, this.cameraDefaults.far);
        this.resetCamera();
    };

    loadworkapp.prototype.initHelper = function () {
        var helper = new THREE.GridHelper(1200, 60, 0xFF4444, 0x404040);
        this.scene.add(helper);
    };
    loadworkapp.prototype.initContent = function () {

        var objectLoader = new THREE.ObjectLoader();
        var myscene = this.scene;
        objectLoader.load(this.url, function (obj) {
            myscene.add(obj);
        });
    };

    loadworkapp.prototype.resizeDisplayGL = function () {

        this.recalcAspectRatio();
        this.renderer.setSize(this.canvas.offsetWidth, this.canvas.offsetHeight, false);

        this.updateCamera();
    };

    loadworkapp.prototype.resetCamera = function () {
        this.camera.position.copy(this.cameraDefaults.posCamera);
        this.cameraTarget.copy(this.cameraDefaults.posCameraTarget);

        this.updateCamera();
    };

    loadworkapp.prototype.updateCamera = function () {
        this.camera.aspect = this.aspectRatio;
        this.camera.lookAt(this.cameraTarget);
        this.camera.updateProjectionMatrix();
    };
    loadworkapp.prototype.render = function () {
        if (!this.renderer.autoClear) this.renderer.clear();

        this.renderer.render(this.scene, this.camera);
    };
    return loadworkapp;

})();