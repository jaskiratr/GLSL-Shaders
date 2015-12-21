var container, stats;
var camera, scene, renderer, composer;
var cube, plane;
var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;
var uniforms;
var clock = new THREE.Clock();
var time = clock.getElapsedTime();
var mouseX = 0.5;
var mouseY = 0.5;
var framecount = 0;

var controls;

var angle = 0,
    speed = .02,
    centerY = 0,
    waveHeight = 50;
var point_index = 0;


uniforms = {
    u_time: {
        type: "f",
        value: 1.0
    },
    u_resolution: {
        type: "v2",
        value: new THREE.Vector2()
    },
    u_mouse: {
        type: "v2",
        value: new THREE.Vector2()
    },
    u_points: {
        type: "v2v",
        value: [new THREE.Vector2(1.0, 1.2),
            new THREE.Vector2(1.5, 1.5),
            new THREE.Vector2(0.4, 0.2),
            new THREE.Vector2(0., 0.5),
            new THREE.Vector2(0., 0.2),
            new THREE.Vector2(0., 0.5),
            new THREE.Vector2(0., 0.2),
            new THREE.Vector2(0., 0.5),
            new THREE.Vector2(0., 0.2),
            new THREE.Vector2(0., 0.5),
            new THREE.Vector2(0., 0.2),
            new THREE.Vector2(0., 0.5),
            new THREE.Vector2(0., 0.2),
            new THREE.Vector2(0., 0.5),
            new THREE.Vector2(0., 0.2),
            new THREE.Vector2(0., 0.5),
            new THREE.Vector2(0., 0.2),
            new THREE.Vector2(0., 0.5),
            new THREE.Vector2(0., 0.2),
            new THREE.Vector2(0., 0.5),
            new THREE.Vector2(0., 0.2)

        ]
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
            if (shaderCount == 2) {
                init();
                animate();
            }
        }
    });
}

function init() {
    clock.start;
    // -------CSS-------
    container = document.createElement('div');
    document.body.appendChild(container);

    camera = new THREE.Camera();
    camera.position.z = 1;
    scene = new THREE.Scene();

    // Plane 
    var geometry = new THREE.PlaneBufferGeometry(2, 2);
    var material = new THREE.ShaderMaterial({
        uniforms: uniforms,
        vertexShader: shadersHolder.vertex,
        fragmentShader: shadersHolder.fragment

    });
    plane = new THREE.Mesh(geometry, material);
    scene.add(plane);


    stats = new Stats();
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.top = '0px';
    container.appendChild(stats.domElement);

    document.addEventListener('mousedown', onDocumentMouseDown, false);
    document.addEventListener('mousemove', onDocumentMouseMove, false);
    document.addEventListener('touchstart', onDocumentTouchStart, false);
    document.addEventListener('touchmove', onDocumentTouchMove, false);



    renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);

    onWindowResize();


    window.addEventListener('resize', onWindowResize, false);
}



function onWindowResize() {

    windowHalfX = window.innerWidth / 2;
    windowHalfY = window.innerHeight / 2;

    // camera.aspect = window.innerWidth / window.innerHeight;
    // camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);

    uniforms.u_resolution.value.x = window.innerWidth;
    uniforms.u_resolution.value.y = window.innerHeight;
    // uniforms.u_mouse.value.x = mouseX;
    // uniforms.u_mouse.value.y = mouseY;
    // composer.reset();


}

//

function onDocumentMouseDown(event) {
    // console.log(event.clientX);
    event.preventDefault();

    mouseX = event.clientX / window.innerWidth;
    mouseY = event.clientY / window.innerHeight;

    uniforms.u_mouse.value.x = mouseX;
    uniforms.u_mouse.value.y = (mouseY);


    uniforms.u_points.value[point_index] = (new THREE.Vector2(mouseX*3, 3 - mouseY*3));

    point_index++;
    if (point_index == 20) {
        point_index = 0;
    }
    console.log(uniforms.u_points.value);
    document.addEventListener('mousemove', onDocumentMouseMove, false);
    // document.addEventListener('mouseup', onDocumentMouseUp, false);
    // document.addEventListener('mouseout', onDocumentMouseOut, false);

    // mouseXOnMouseDown = event.clientX - windowHalfX;
    // mouseYOnMouseDown = event.clientY - windowHalfY;
    // targetRotationOnMouseDownX = targetRotationX;
    // targetRotationOnMouseDownY = targetRotationY;
}

function onDocumentMouseMove(event) {
    // console.log(time);
    // if (framecount % 2 == 0) {
    //     console.log("add");
    //     mouseX = event.clientX / window.innerWidth;
    //     mouseY = event.clientY / window.innerHeight;

    //     uniforms.u_mouse.value.x = mouseX*3.;
    //     uniforms.u_mouse.value.y = (mouseY)*3.;


    //     uniforms.u_points.value[point_index] = (new THREE.Vector2(mouseX, 1 - mouseY));

    //     point_index++;
    //     if (point_index == 20) {
    //         point_index = 0;
    //     }
    // }
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
    //  if (framecount % 2 == 0) {
    //     console.log("add");
    //     mouseX = event.clientX / window.innerWidth;
    //     mouseY = event.clientY / window.innerHeight;

    //     uniforms.u_mouse.value.x = mouseX;
    //     uniforms.u_mouse.value.y = (mouseY);


    //     uniforms.u_points.value[point_index] = (new THREE.Vector2(mouseX, 1 - mouseY));

    //     point_index++;
    //     if (point_index == 20) {
    //         point_index = 0;
    //     }
    // }
}

//

function animate() {
    uniforms.u_time.value += 0.02;
    // console.log( uniforms.u_time.value);

    requestAnimationFrame(animate);
    render();
    stats.update();

}

function render() {
    // cube.rotation.y += (targetRotationX - cube.rotation.y) * 0.05;
    // cube.rotation.x += (targetRotationY - cube.rotation.x) * 0.05;
    // renderer.render(scene, camera);
    // camera.lookAt(plane.position);
    // camera.targetRotationX += 0.01;
    // angle += speed;
    // camera.position.y = centerY + (Math.cos(angle) * waveHeight/2);
    // camera.position.x = 30+ (Math.sin(angle) * waveHeight);

    renderer.render(scene, camera);
    framecount++;

    // renderer.clear();
    // composer.render(0.01);
}

$(document).ready(function() {
    loadShaders("shaders/frag4.frag", "fragment", 1);
    loadShaders("shaders/vert.vert", "vertex", 2);
});
