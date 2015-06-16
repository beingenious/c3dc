if ( ! Detector.webgl ) Detector.addGetWebGLMessage();

      var container, stats;

      var camera, cameraTarget, scene, renderer, controls;

      init();
      animate();

      function init() {

        container = document.createElement( 'div' );
        document.body.appendChild( container );


        camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.set( 10, 10, 10);

        controls = new THREE.TrackballControls( camera );

        controls.rotateSpeed = 1.5;
        controls.zoomSpeed = 1.5;
        controls.panSpeed = 1;

        controls.noZoom = false;
        controls.noPan = false;

        controls.staticMoving = true;
        controls.dynamicDampingFactor = 0.3;

        controls.keys = [ 65, 83, 68 ];

        controls.addEventListener( 'change', render );

       // camera = new THREE.PerspectiveCamera( 35, window.innerWidth / window.innerHeight, 1, 15 );

        cameraTarget = new THREE.Vector3( 0, -0.25, 0 );

        scene = new THREE.Scene();
        scene.fog = new THREE.FogExp2( 0xcccccc, 0.002 );

        // PLY file

        var loader = new THREE.PLYLoader();
        loader.addEventListener( 'load', function ( event ) {

          var geometry = event.content;
          //var material = new THREE.MeshPhongMaterial();
          var material = new THREE.MeshBasicMaterial();
          var mesh = new THREE.Mesh( geometry, material );

          mesh.position.set( 0, - 0.25, 0 );
          mesh.rotation.set( 0, - Math.PI / 2, 0 );
          mesh.scale.set( 0.1, 0.1, 0.1 );

          mesh.castShadow = true;
          mesh.receiveShadow = true;

          scene.add( mesh );

        } );
        loader.load( '/models/ajaccio.ply' );

        // Lights

        scene.add( new THREE.AmbientLight( 0x777777 ) );

        addShadowedLight( 1, 1, 1, 0xffffff, 1.35 );
        addShadowedLight( 0.5, 1, -1, 0xffaa00, 1 );

        // renderer

        renderer = new THREE.WebGLRenderer( { antialias: true } );
        renderer.setClearColor( scene.fog.color );
        renderer.setPixelRatio( window.devicePixelRatio );
        renderer.setSize( window.innerWidth, window.innerHeight );

        renderer.gammaInput = true;
        renderer.gammaOutput = true;

        renderer.shadowMapEnabled = true;
        renderer.shadowMapCullFace = THREE.CullFaceBack;

        container.appendChild( renderer.domElement );

        // stats

        stats = new Stats();
        stats.domElement.style.position = 'absolute';
        stats.domElement.style.top = '0px';
        container.appendChild( stats.domElement );

        // resize

        window.addEventListener( 'resize', onWindowResize, false );

      }

      function addShadowedLight( x, y, z, color, intensity ) {

        var directionalLight = new THREE.DirectionalLight( color, intensity );
        directionalLight.position.set( x, y, z )
        scene.add( directionalLight );

        directionalLight.castShadow = true;
        // directionalLight.shadowCameraVisible = true;

        var d = 1;
        directionalLight.shadowCameraLeft = -d;
        directionalLight.shadowCameraRight = d;
        directionalLight.shadowCameraTop = d;
        directionalLight.shadowCameraBottom = -d;

        directionalLight.shadowCameraNear = 1;
        directionalLight.shadowCameraFar = 4;

        directionalLight.shadowMapWidth = 1024;
        directionalLight.shadowMapHeight = 1024;

        directionalLight.shadowBias = -0.005;
        directionalLight.shadowDarkness = 0.15;

      }

      function onWindowResize() {

        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        controls.handleResize();

        renderer.setSize( window.innerWidth, window.innerHeight );

      }

      function animate() {

        requestAnimationFrame( animate );

        render();
        controls.update();
        stats.update();


      }

      function render() {

        var timer = Date.now() * 0.0005;

        //camera.position.x = Math.sin( timer ) * 3;
        //camera.position.z = Math.cos( timer ) * 3;

        camera.lookAt( cameraTarget );

        renderer.render( scene, camera );

      }
