var container, stats;
var camera, scene, renderer, composer;
var cube, plane;
var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;
var uniforms;
var clock = new THREE.Clock();

var controls;

var angle = 0,
    speed = .02,
    centerY = 0,
    waveHeight = 50;


uniforms = {
    texture: {
        type: "t",
        value: THREE.ImageUtils.loadTexture('shaders/explosion.png')
    },
    u_time: {
        type: "f",
        value: 1.0
    },
    u_resolution: {
        type: "v2",
        value: new THREE.Vector2()
    }
};
var shadersHolder = {
    vertex: '',
    fragment: ''
};
var shaderCount = 0;

function loadShaders(url, shaderType, position) {
    console.log(url, shaderType);
    $.ajax({
        url: url,
        type: "GET",
        dataType: "text",
        success: function(data, textStatus, jqxhr) {
            shadersHolder[shaderType] = data;
            // console.log(shadersHolder);
            shaderCount++;
            if (shaderCount == 8) {
                init();
                animate();
            }
        }
    });
}

function init() {

    // -------CSS-------
    container = document.createElement('div');
    document.body.appendChild(container);

    // Create the camer10
    camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 0.1, 10000);
    camera.position.z = 300;
    

    // angle += speed;
    // camera.position.y =   (Math.sin(angle) * 100);

    controls = new THREE.OrbitControls(camera);
    //        controls.damping = 0.2;
    controls.addEventListener('change', render);

    scene = new THREE.Scene();



    // Plane CROSS
    var geometry = new THREE.PlaneBufferGeometry(150, 150);
    geometry.rotateY(-Math.PI / 4.5);
    // geometry.rotateX(-Math.PI / 4.3);
    geometry.translate(20, 0, -40);
    // geometry.translate(50, 0, -40);

    var material = new THREE.ShaderMaterial({
        uniforms: uniforms,
        vertexShader: shadersHolder.dot_vertex,
        fragmentShader: shadersHolder.crosses

    });
    material.transparent = true;
    material.side = THREE.DoubleSide;

    plane = new THREE.Mesh(geometry, material);
    scene.add(plane);


    // Plane DOTS
    var geometry = new THREE.PlaneBufferGeometry(150, 150);
    geometry.rotateY(-Math.PI / 4.5);
    // geometry.rotateX(-Math.PI / 4.3);
    geometry.translate(20, 0, -30);

    var material = new THREE.ShaderMaterial({
        uniforms: uniforms,
        vertexShader: shadersHolder.dot_vertex,
        fragmentShader: shadersHolder.dotMat

    });
    material.transparent = true;
    material.side = THREE.DoubleSide;

    plane = new THREE.Mesh(geometry, material);
    scene.add(plane);


    //Explosion
    var material = new THREE.ShaderMaterial({
        uniforms: uniforms,
        vertexShader: shadersHolder.blob_vertex,
        fragmentShader: shadersHolder.fragment

    });
    var mesh = new THREE.Mesh(
        new THREE.IcosahedronGeometry(20, 4),
        material
    );
    scene.add(mesh);


    // Plane ARCS
    var geometry = new THREE.PlaneBufferGeometry(100, 100);
    geometry.rotateY(-Math.PI / 4.5);
    // geometry.rotateX(-Math.PI / 4.3);
    // geometry.translate( 0,0,Math.random()*50-2);

    var material = new THREE.ShaderMaterial({
        uniforms: uniforms,
        vertexShader: shadersHolder.circle_vertex,
        fragmentShader: shadersHolder.circle1

    });
    material.transparent = true;
    material.side = THREE.DoubleSide;

    plane = new THREE.Mesh(geometry, material);
    scene.add(plane);

    //Plane Ripples
    var geometry = new THREE.PlaneBufferGeometry(100, 100);
    geometry.rotateY(-Math.PI / 4.5);
    // geometry.rotateX(-Math.PI / 4.3);
    geometry.translate(-25, 0, 30);
    // geometry.translate(50, 0, -40);

    var material = new THREE.ShaderMaterial({
        uniforms: uniforms,
        vertexShader: shadersHolder.dot_vertex,
        fragmentShader: shadersHolder.ripples

    });
    material.transparent = true;
    material.side = THREE.DoubleSide;

    plane = new THREE.Mesh(geometry, material);
    scene.add(plane);


    renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(0x111111);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);
    renderer.autoClear = false;

    stats = new Stats();
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.top = '0px';
    container.appendChild(stats.domElement);

    document.addEventListener('mousedown', onDocumentMouseDown, false);
    document.addEventListener('touchstart', onDocumentTouchStart, false);
    document.addEventListener('touchmove', onDocumentTouchMove, false);

    renderer.autoClear = false;

    var renderModel = new THREE.RenderPass(scene, camera);
    var effectBloom = new THREE.BloomPass(1.25);
    var effectFilm = new THREE.FilmPass(0.75, 0.35, 2000, false);
    effectFilm.renderToScreen = true;
    composer = new THREE.EffectComposer(renderer);
    composer.addPass(renderModel);
    composer.addPass(effectBloom);
    composer.addPass(effectFilm);

    onWindowResize();
    window.addEventListener('resize', onWindowResize, false);
}

function onWindowResize() {

    windowHalfX = window.innerWidth / 2;
    windowHalfY = window.innerHeight / 2;

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);

    uniforms.u_resolution.value.x = renderer.domElement.width;
    uniforms.u_resolution.value.y = renderer.domElement.height;
    composer.reset();

}

//

function onDocumentMouseDown(event) {

    // event.preventDefault();

    // document.addEventListener('mousemove', onDocumentMouseMove, false);
    // document.addEventListener('mouseup', onDocumentMouseUp, false);
    // document.addEventListener('mouseout', onDocumentMouseOut, false);

    // mouseXOnMouseDown = event.clientX - windowHalfX;
    // mouseYOnMouseDown = event.clientY - windowHalfY;
    // targetRotationOnMouseDownX = targetRotationX;
    // targetRotationOnMouseDownY = targetRotationY;
}

function onDocumentMouseMove(event) {

    // mouseX = event.clientX - windowHalfX;
    // mouseY = event.clientY - windowHalfY;

    // targetRotationX = targetRotationOnMouseDownX + (mouseX - mouseXOnMouseDown) * 0.02;
    // targetRotationY = targetRotationOnMouseDownY + (mouseY - mouseYOnMouseDown) * 0.02;
}

function onDocumentMouseUp(event) {
    // document.removeEventListener('mousemove', onDocumentMouseMove, false);
    // document.removeEventListener('mouseup', onDocumentMouseUp, false);
    // document.removeEventListener('mouseout', onDocumentMouseOut, false);
}

function onDocumentMouseOut(event) {
    // document.removeEventListener('mousemove', onDocumentMouseMove, false);
    // document.removeEventListener('mouseup', onDocumentMouseUp, false);
    // document.removeEventListener('mouseout', onDocumentMouseOut, false);
}

function onDocumentTouchStart(event) {
    // if (event.touches.length === 1) {
    //     event.preventDefault();
    //     mouseXOnMouseDown = event.touches[0].pageX - windowHalfX;
    //     targetRotationOnMouseDownX = targetRotationX;
    // }
}

function onDocumentTouchMove(event) {
    // if (event.touches.length === 1) {
    //     event.preventDefault();
    //     mouseX = event.touches[0].pageX - windowHalfX;
    //     // targetRotation = targetRotationOnMouseDown + (mouseX - mouseXOnMouseDown) * 0.05;
    // }
}

//

function animate() {
    uniforms.u_time.value += 0.01;
    requestAnimationFrame(animate);
    render();
    stats.update();
}

function render() {
    // cube.rotation.y += (targetRotationX - cube.rotation.y) * 0.05;
    // cube.rotation.x += (targetRotationY - cube.rotation.x) * 0.05;
    // renderer.render(scene, camera);
    camera.lookAt(plane.position);
    // camera.targetRotationX += 0.01;
    angle += speed;
    camera.position.y = centerY + (Math.cos(angle) * waveHeight/2);
    camera.position.x = 30+ (Math.sin(angle) * waveHeight);

    renderer.clear();
    composer.render(0.01);
}

$(document).ready(function() {
    loadShaders("shaders/fragment.frag", "fragment", 1);
    loadShaders("shaders/blob_vertex.vert", "blob_vertex", 2);
    loadShaders("shaders/circle1.frag", "circle1", 3);
    loadShaders("shaders/circle_vertex.vert", "circle_vertex", 4);
    loadShaders("shaders/dotMat.frag", "dotMat", 5);
    loadShaders("shaders/dot_vertex.vert", "dot_vertex", 6);
    loadShaders("shaders/crosses.frag", "crosses", 7);
    loadShaders("shaders/ripples.frag", "ripples", 8);

});
