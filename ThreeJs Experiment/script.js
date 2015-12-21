var container, stats;
var camera, scene, renderer;
var cube, plane;
var targetRotationX = 0;
var targetRotationY = 0;
var targetRotationOnMouseDownX = 0;
var targetRotationOnMouseDownY = 0;
var mouseX = 0;
var mouseY = 0;
var mouseZ = 0;
var mouseXOnMouseDown = 0;
var mouseYOnMouseDown = 0;
var mouseZOnMouseDown = 0;
var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;
var objects = [];

var gui, controls;

var player, rotation_speed, movement_speed;

var yaw =0, pitch =0, roll =0;
var posx =0, posy =0, posz =0;

var dummy =0;

///////////////SOCKET

// try {
//     var socket = io.connect("http://192.168.1.13:4000");
//     socket.on("gyro_data", function(data) {
//         var gyro = data.split(" ");
//         yaw = gyro[1] * Math.PI / 180; 
//         pitch = gyro[1] * Math.PI / 180;
//         roll = gyro[2] * Math.PI / 180; 
//     });

//     socket.on("pos_data", function(data) {
//         posx = data.args[0];
//         posy = data.args[1];
//         posz = data.args[2];
//     });

//     socket.on("image_path",function(data){
//         console.log(data);
//         //new object;    
//         newNote(data);
//     });

// } catch (e) {
//     console.log("exception occurred");
//     console.log(e);
// }

init(); // Initialize everything
animate(); // Animate everything




function init() {

    // -------CSS-------
    container = document.createElement('div');
    document.body.appendChild(container);

    var info = document.createElement('div');
    info.style.position = 'absolute';
    info.style.top = '10px';
    info.style.width = '100%';
    info.style.textAlign = 'center';
    info.innerHTML = 'Drag to spin the cube';
    container.appendChild(info);
    // -------CSS-------

    // Create the camera
    camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 10000);
    camera.position.z = 1000;

    // Create the Scene
    scene = new THREE.Scene();
    scene.add(new THREE.AmbientLight(0x505050));

    var light = new THREE.SpotLight(0xffffff, 1.5);
    light.position.set(0, 500, 2000);
    light.castShadow = true;

    light.shadowCameraNear = 200;
    light.shadowCameraFar = camera.far;
    light.shadowCameraFov = 50;

    light.shadowBias = -0.00022;

    light.shadowMapWidth = 2048;
    light.shadowMapHeight = 2048;

    scene.add(light);

    // Cube
    var geometry = new THREE.BoxGeometry(80, 80, 5);

    // for (var i = 0; i < 20; i++) {
    //     var material = new THREE.MeshLambertMaterial({
    //         color: Math.random() * 0xffffff
    //     });

    //     var object = new THREE.Mesh(geometry, material);
    //     object.position.x = Math.random() * 1000 - 500;
    //     object.position.y = Math.random() * 600 - 300;
    //     object.position.z = Math.random() * 800 - 400;

    //     object.rotation.x = Math.random() * 2 * Math.PI;
    //     object.rotation.y = Math.random() * 2 * Math.PI;
    //     object.rotation.z = Math.random() * 2 * Math.PI;

    //     object.castShadow = true;
    //     object.receiveShadow = true;

    //     scene.add(object);

    //     objects.push(object);
    // };

    initPlayer();

    renderer = new THREE.WebGLRenderer({
        antialias: true
    });
    renderer.setClearColor(0xf0f0f0);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFShadowMap;

    container.appendChild(renderer.domElement);

    stats = new Stats();
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.top = '0px';
    container.appendChild(stats.domElement);

    document.addEventListener('mousedown', onDocumentMouseDown, false);
    document.addEventListener('touchstart', onDocumentTouchStart, false);
    document.addEventListener('touchmove', onDocumentTouchMove, false);

    //

    window.addEventListener('resize', onWindowResize, false);



}

function initPlayer(){
    player = new THREE.Mesh(new THREE.CubeGeometry(2,2,2), new THREE.MeshNormalMaterial());
    scene.add(player);
    var geometry = new THREE.BoxGeometry(80, 80, 5);
    var material = new THREE.MeshLambertMaterial({
        color:  0xff0000
    });

    player = new THREE.Mesh(geometry, material);

    // var texture, material;

    // texture = THREE.ImageUtils.loadTexture( "images/out_0.png" );


    // material = new THREE.MeshLambertMaterial({ map : texture });
    // player = new THREE.Mesh(new THREE.PlaneGeometry(130, 160), material);
    // player.material.side = THREE.DoubleSide;
    
    // player.position.x = 0;
    // player.position.y = 0;
    // player.position.z = 0;

    player.rotation.x = 0;
    player.rotation.y = 0;
    player.rotation.z = 0;

    // player.scale.x = Math.random() * 2 + 1;
    // player.scale.y = Math.random() * 2 + 1;
    // player.scale.z = Math.random() * 2 + 1;

    

    player.castShadow = true;
    player.receiveShadow = true;

    scene.add(player);

    // objects.push(player);


    console.log('player added');
}

function newNote(path){
    // note = new THREE.Mesh(new THREE.CubeGeometry(2,2,2), new THREE.MeshNormalMaterial());
    // scene.add(player);
    // var geometry = new THREE.BoxGeometry(80, 80, 5);
    // var material = new THREE.MeshLambertMaterial({
    //     color:  0xff0000
    // });

    

    var texture, material,note;

    texture = THREE.ImageUtils.loadTexture( "images/"+path );
    material = new THREE.MeshLambertMaterial({ map : texture });
    note = new THREE.Mesh(new THREE.PlaneGeometry(130, 160), material);
    note.material.side = THREE.DoubleSide;
    
    note.position.x = dummy;
    dummy+= 100;
    // note.position.y = 0;
    // note.position.z = 0;

    note.rotation.x = 0;
    note.rotation.y = 0;
    note.rotation.z = 0;

    // note.scale.x = Math.random() * 2 + 1;
    // note.scale.y = Math.random() * 2 + 1;
    // note.scale.z = Math.random() * 2 + 1;

    

    note.castShadow = true;
    note.receiveShadow = true;

    scene.add(note);
    objects.push(note);


    console.log('Note added');
}

function onWindowResize() {

    windowHalfX = window.innerWidth / 2;
    windowHalfY = window.innerHeight / 2;

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);

}

//

function onDocumentMouseDown(event) {

    event.preventDefault();

    document.addEventListener('mousemove', onDocumentMouseMove, false);
    document.addEventListener('mouseup', onDocumentMouseUp, false);
    document.addEventListener('mouseout', onDocumentMouseOut, false);

    mouseXOnMouseDown = event.clientX - windowHalfX;
    mouseYOnMouseDown = event.clientY - windowHalfY;
    targetRotationOnMouseDownX = targetRotationX;
    targetRotationOnMouseDownY = targetRotationY;

}

function onDocumentMouseMove(event) {

    mouseX = event.clientX - windowHalfX;
    mouseY = event.clientY - windowHalfY;

    targetRotationX = targetRotationOnMouseDownX + (mouseX - mouseXOnMouseDown) * 0.02;
    targetRotationY = targetRotationOnMouseDownY + (mouseY - mouseYOnMouseDown) * 0.02;

}

function onDocumentMouseUp(event) {

    document.removeEventListener('mousemove', onDocumentMouseMove, false);
    document.removeEventListener('mouseup', onDocumentMouseUp, false);
    document.removeEventListener('mouseout', onDocumentMouseOut, false);

}

function onDocumentMouseOut(event) {

    document.removeEventListener('mousemove', onDocumentMouseMove, false);
    document.removeEventListener('mouseup', onDocumentMouseUp, false);
    document.removeEventListener('mouseout', onDocumentMouseOut, false);

}

function onDocumentTouchStart(event) {

    if (event.touches.length === 1) {

        event.preventDefault();

        mouseXOnMouseDown = event.touches[0].pageX - windowHalfX;
        targetRotationOnMouseDownX = targetRotationX;

    }

}

function onDocumentTouchMove(event) {

    if (event.touches.length === 1) {

        event.preventDefault();

        mouseX = event.touches[0].pageX - windowHalfX;
        // targetRotation = targetRotationOnMouseDown + (mouseX - mouseXOnMouseDown) * 0.05;

    }

}

//

function animate() {
    requestAnimationFrame(animate);
    player.rotation.x = 0.5* pitch + 0.5*player.rotation.x;
    player.rotation.y =0.5* yaw+ 0.5*player.rotation.y;
    player.rotation.z =0.5* roll+ 0.5*player.rotation.z;

    player.position.x = -posx;
    player.position.y = posy;
    player.position.z = posz;


    render();
    stats.update();



}
// 
function render() {
    // requestAnimationFrame(render);
    // player.rotation.x=0;
    // console.log(yaw);
    // console.log(player.rotation.x);
    // cube.rotation.x = controls.rotationX;
    // cube.rotation.y = controls.rotationY;
    renderer.render(scene, camera);
}
