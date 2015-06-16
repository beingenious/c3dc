 // once everything is loaded, we run our Three.js stuff.
    function init() {
        var controls;
        // create a scene, that will hold all our elements such as objects, cameras and lights.
        var scene = new THREE.Scene();
        // create a camera, which defines where we're looking at.
        var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 500);
        // create a render and set the size
        var webGLRenderer = new THREE.WebGLRenderer();
        webGLRenderer.setClearColor(new THREE.Color(0x000, 1.0));
        webGLRenderer.setSize(window.innerWidth, window.innerHeight);
        webGLRenderer.shadowMapEnabled = true;
        // position and point the camera to the center of the scene
        camera.position.x = 100;
        camera.position.y = 100;
        camera.position.z = 200;
        cameraTarget = new THREE.Vector3(0, 0, 0);
        camera.lookAt(cameraTarget);

        //controle
        controls = new THREE.TrackballControls( camera );

        controls.rotateSpeed = 1.8;
        controls.zoomSpeed = 1.5;
        controls.panSpeed = 1;
        controls.noZoom = false;
        controls.noPan = false;
        controls.staticMoving = true;
        controls.dynamicDampingFactor = 0.3;


        controls.keys = [ 65, 83, 68 ];
        controls.target.set( cameraTarget.x, cameraTarget.y, cameraTarget.z );
        controls.addEventListener( 'change', render );



        // add spotlight for the shadows
        var spotLight = new THREE.SpotLight(0xffffff);
        spotLight.position.set(20, 20, 20);
        scene.add(spotLight);
        // add the output of the renderer to the html element
        document.getElementsByClassName("WebGL-output")[0].appendChild(webGLRenderer.domElement);
        // call the render function
        var step = 0;
        // setup the control gui

        var group;
        //var gui = new dat.GUI();
        var loader = new THREE.PLYLoader();
        var group = new THREE.Object3D();
        var id = document.getElementsByClassName("WebGL-output")[0].id;
        loader.load("http://157.159.160.112:8080/results/"+id, function (geometry) {
        //loader.load("/models/uqHDCLXOVn.ply", function (geometry) {
            var material = new THREE.PointCloudMaterial({
                //color: 0xffffff,
                size: 0.008,
                //opacity: 0.6,
                transparent: true,
                //blending: THREE.AdditiveBlending,
                vertexColors: THREE.FaceColors

            });
            group = new THREE.PointCloud(geometry, material);
            group.sortParticles = true;
            scene.add(group);

            controls.target = group.position;
            animate();
        });

        function animate() {

          requestAnimationFrame( animate );

          render();
          controls.update();

        }

        function render() {


            //camera.lookAt( camera );

            //webGLRenderer.render(scene, camera);

            camera.lookAt( cameraTarget );
            webGLRenderer.render( scene, camera );
        }

    }
    window.onload = init;
