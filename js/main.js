// import {dou} from '.dog.js';
window.onload=function(){
	
    var ind = document.getElementsByClassName("indicate");
	//ind[0].innerHTML = dou();
	//console.log(ind);
	//ind[0].innerHTML = 'pes';
    //ind.innerText = 'gggg';
    var x = 0, z = 0;
	var vec3 = new THREE.Vector3;

    var scene = new THREE.Scene;
	//scene.background = new THREE.Color( 0x000000, 0 );
    var camera = new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight, 0.1, 10000);
    var render = new THREE.WebGLRenderer({ alpha: true, transparent: true  } ); 	//{ antialias: true },  
    // 
    render.setSize(window.innerWidth, window.innerHeight);
    render.setClearColor(0xEEEEEE, 0.7);
    render.shadowMap.enabled = true;
    render.shadowMap.type = THREE.PCFSoftShadowMap;

 
    // render.setClearAlpha(1.0);

    //console.log(render.getContext());
    //ind[0].innerHTML = render.getClearAlpha();
    
    document.body.appendChild(render.domElement);

    var axes = new THREE.AxesHelper( 60 );
    scene.add(axes);
    
    // var cubeGeometry = new THREE.CubeGeometry(4,4,4);
	// var cubeMaterial = new THREE.MeshBasicMaterial(
	// 	{color: 0xff0000, wireframe: true});
    // var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
    

    var cubeGeometry = new THREE.CubeGeometry(4,4,4);
    var cubeMaterial = new THREE.MeshPhongMaterial(
        {color: 0xcc0000});
    var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);    

	cube.position.x = -40;
	cube.position.y = 3;
	cube.position.z = 0;
	cube.scale.y = 10;
	cube.castShadow = true;
	scene.add(cube);
     
	var planeGeometry = new THREE.PlaneGeometry(50, 50, 10, 10);
	//   var planeMaterial = new THREE.MeshLambertMaterial({color: 0x00DD00, side: THREE.DoubleSide, wireframe: false});
	var planeMaterial = new THREE.MeshLambertMaterial({color: 0x00ee00, /*side: THREE.DoubleSide, */wireframe: false});
	var plane = new THREE.Mesh(planeGeometry, planeMaterial);
	plane.receiveShadow = true;
	plane.rotation.x = -0.5*Math.PI;
	//plane.scale.x = 2;
	//plane.scale.y = 2;
	scene.add(plane);

	var shaderMaterial = new THREE.ShaderMaterial( {
		vertexShader: document.getElementById( 'vertexShader' ).textContent,
		fragmentShader: document.getElementById( 'fragmentShader' ).textContent
	});

	var sphere_sh_geometry = new THREE.SphereBufferGeometry(10, 64, 64);
	var sphere_sh = new THREE.Mesh(sphere_sh_geometry, shaderMaterial);
    sphere_sh.position.set(-10, 10, 0);
    sphere_sh.castShadow = true;
	scene.add(sphere_sh);


	camera.position.set(40, 45, 40);
	var amColor = "#faffe3";
	var amLight = new THREE.AmbientLight(amColor, 0.9);
	scene.add(amLight);

	var light = new THREE.DirectionalLight(0xfff7e8, 1); 
	scene.add(light);
	light.position.y += 40;

	camera.lookAt(scene.position);



    //Set up shadow properties for the light
    var spotLight = new THREE.SpotLight( 0xffffff );
    spotLight.position.set( -40, 60, -10 );
    spotLight.castShadow = true;	
	spotLight.shadow.mapSize.width = 2048;  // default
	spotLight.shadow.mapSize.height = 2048; // default
	spotLight.shadow.camera.near = 0.5;       // default
	spotLight.shadow.camera.far = 500      // default       
    scene.add(spotLight );
    
    var manager = new THREE.LoadingManager();
    var loader = new THREE.ImageLoader(manager);
    var textureBody = new THREE.Texture();
    var textureHead = new THREE.Texture();

    loader.load('model/cerberus/Cerberus_A.jpg', function(image){
         textureBody.image = image;
         textureBody.needsUpdate = true;
    });

    meshes = [];
    //var body;
    var objLoader = new THREE.OBJLoader();



    objLoader.load('model/cerberus/Cerberus.obj', function(object){ 
        // console.log(object);
        //var body;
        object.traverse(function(child){
            if (child instanceof THREE.Mesh){
                meshes.push(child);
            }
        });
    
      //console.log(meshes);

		var body = meshes[0];   
        // console.log(body);
		body.scale.set(10, 10, 10);
		body.position.set(10, 3, 0);
		body.castShadow = true;
		scene.add(body);
      
        var bumpMapBody = new THREE.TextureLoader().load("model/Cerberus/Cerberus_M.jpg");
        var blphaMapBody = new THREE.TextureLoader().load("model/Cerberus/Cerberus_R.jpg");

        // body.material = new THREE.MeshNormalMaterial();
        body.material = new THREE.MeshPhongMaterial({
            map: textureBody,
            bumpMap: bumpMapBody,
            // alphaMap: blphaMapBody,
            bumpScale: 1,
            specular: 0xfff7e8           
        });      
    });    
    
    var strela = new THREE.Mesh();
    var strelkaLoader = new THREE.OBJLoader();
    strelkaLoader.load('model/stralka.obj', function(object){ 
        var meshes2 = [];
        object.traverse(function(child){
            if (child instanceof THREE.Mesh){
                meshes2.push(child);
            }
        });               
       
    
        strela = meshes2[0];
        strela.material = new THREE.MeshPhongMaterial({specular: 0x222222, color: 0x0000ff});
        console.log(meshes);
        // strela.scale.set(0.01, 0.01, 0.01);
        strela.position.set(0, 1, 30);
        scene.add(strela);
    });

       //==============besier============================
    var curve = new THREE.CubicBezierCurve(
        new THREE.Vector2( -10, 0 ),
        new THREE.Vector2( -5, 15 ),
        new THREE.Vector2( 20, 15 ),
        new THREE.Vector2( 10, 0 )
    );
    
    var points = curve.getPoints( 50 );
    var geometry = new THREE.BufferGeometry().setFromPoints( points );
    
    var material = new THREE.LineBasicMaterial( { color : 0xcccc00 } );
    
    // Create the final object to add to the scene
    var curveObject = new THREE.Line( geometry, material );
    curveObject.castShadow = true;
    scene.add(curveObject);
    curveObject.position.x += 20;
    curveObject.scale.y = 5;
    
   //==============end of besier============================     
    
    // var controls = new THREE.TrackballControls( camera );    
    var controls = new THREE.OrbitControls (camera, render.domElement);  
	controls.enablePan = false;
    // controls.autoRotate = true;
    // controls.autoRotateSpeed = 300;
        // body.position.x += 1;
    
    var angle = 0;  
    var angle_change = 2*Math.PI/180;
	document.addEventListener('keydown', function(event) {
		//ind[0].innerHTML = event.key;
		// if (event.key =="ArrowLeft")
		// 	angle += angle_change;
		// if (event.key =="ArrowRight")
		// 	angle -= angle_change;    
		// if (event.key =="ArrowUp"){
        //     z -=0.2*Math.cos(angle);
        //     x -=0.2*Math.sin(angle);
        // }
		// if (event.key =="ArrowDown"){
        //     z +=0.2*Math.cos(angle);
        //     x +=0.2*Math.sin(angle);
        // }


		if (event.key =="ArrowLeft")
            //angle += angle_change;
            k_left = true;
		if (event.key =="ArrowRight")
            k_right = true;    
		if (event.key =="ArrowUp"){
            k_up = true;
        }
		if (event.key =="ArrowDown"){
            k_down = true;
        }        
      });

    var k_left = false;
    var k_right = false;
    var k_up = false;
    var k_down = false;
     
    document.addEventListener('keyup', function(event) {
        if (event.key =="ArrowLeft")
            k_left = false;
        if (event.key =="ArrowRight")
            k_right = false;        
        if (event.key =="ArrowUp")
            k_up = false;
        if (event.key =="ArrowDown")
            k_down = false;                      
    });
	
    var rendering = function(){  
        // ind[0].innerHTML = controls.keys;      
        //  if  (controls.keys)
        //  ind[0].innerHTML = '32';
        // x += 1;
		
		
        // cube.position.x = x;
        // cube.position.z = z;


//=======================key test====================
        if (k_left)
            angle += angle_change;
        if (k_right)
            angle -= angle_change;
        if (k_up){
            z -=0.2*Math.cos(angle);
            x -=0.2*Math.sin(angle);        
        }
        if (k_down){
            z +=0.2*Math.cos(angle);
            x +=0.2*Math.sin(angle);
        }
//======================= end key test====================
        strela.position.z = z;
        strela.position.x = x;
        strela.rotation.y = angle;
		camera.getWorldDirection(vec3);
        //ind[0].innerHTML = vec3.x + '<br>' + vec3.y + '<br>' + vec3.z + '<br>' + '../';
        ind[0].innerHTML = 'x=' + x + '<br>' + 'z=' + z + '<br>' +'angle=' + angle*180/Math.PI + '<br>';
		//console.log(camera.getWorldDirection(vec3));
        requestAnimationFrame(rendering);
        controls.update();
        render.render(scene, camera);        
    }
    rendering();
}