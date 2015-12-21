String.prototype.format = function() {

    var str = this;
    for (var i = 0; i < arguments.length; i++) {

        str = str.replace('{' + i + '}', arguments[i]);

    }
    return str;

}

var container, stats;
var camera, scene, renderer;
var splineHelperObjects = [],
    splineOutline;
var splinePointsLength = 4;
var positions = [];
var options;
var uniforms;
var geometry = new THREE.Geometry();

var ARC_SEGMENTS = 200;
var splineMesh;
var extrusion;

var splines = {

};


// init();
// animate();

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

    container = document.createElement('div');
    document.body.appendChild(container);
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 10000);
    camera.position.z = 1000;
    scene.add(camera);

    scene.add(new THREE.AmbientLight(0xf0f0f0));
    var light = new THREE.SpotLight(0xffffff, 1.5);
    light.position.set(0, 1500, 200);
    light.castShadow = true;
    light.shadowCameraNear = 200;
    light.shadowCameraFar = camera.far;
    light.shadowCameraFov = 70;
    light.shadowBias = -0.000222;
    light.shadowDarkness = 0.25;
    light.shadowMapWidth = 1024;
    light.shadowMapHeight = 1024;
    scene.add(light);
    spotlight = light;

    var planeGeometry = new THREE.PlaneGeometry(2000, 2000);
    planeGeometry.rotateX(-Math.PI / 2);
    var planeMaterial = new THREE.MeshBasicMaterial({
        color: 0xeeeeee
    });

    var plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.position.y = -200;
    plane.receiveShadow = true;
    scene.add(plane);

    var helper = new THREE.GridHelper(1000, 100);
    helper.position.y = -199;
    helper.material.opacity = 0.25;
    helper.material.transparent = true;
    scene.add(helper);

    var axis = new THREE.AxisHelper();
    axis.position.set(-500, -500, -500);
    scene.add(axis);

    renderer = new THREE.WebGLRenderer({
        antialias: true
    });
    renderer.setClearColor(0xf0f0f0);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    container.appendChild(renderer.domElement);

    var info = document.createElement('div');
    info.style.position = 'absolute';
    info.style.top = '10px';
    info.style.width = '100%';
    info.style.textAlign = 'center';
    options = document.createElement('div');
    options.style.position = 'absolute';
    options.style.top = '30px';
    options.style.width = '100%';
    options.style.textAlign = 'center';

    options.innerHTML = 'Points: <input type="button" onclick="addPoint();" value="+" />\
                    <input type="button" onclick="removePoint();" value="-" />';

    container.appendChild(info);
    container.appendChild(options);

    stats = new Stats();
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.top = '0px';
    container.appendChild(stats.domElement);

    // Controls
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.damping = 0.2;
    controls.addEventListener('change', render);

    transformControl = new THREE.TransformControls(camera, renderer.domElement);
    transformControl.addEventListener('change', render);

    scene.add(transformControl);

    /*******
     * Curves
     *********/

    var i;
    for (i = 0; i < splinePointsLength; i++) {
        addSplineObject(positions[i]);
    }
    positions = [];
    for (i = 0; i < splinePointsLength; i++) {
        positions.push(splineHelperObjects[i].position);
    }

    var geometry = new THREE.Geometry();
    for (var i = 0; i < ARC_SEGMENTS; i++) {
        geometry.vertices.push(new THREE.Vector3());
    }

    var curve;
    curve = new THREE.CatmullRomCurve3(positions);
    curve.type = 'chordal';
    curve.mesh = new THREE.Line(geometry.clone(), new THREE.LineBasicMaterial({
        color: 0x0000ff,
        opacity: 0.35,
        linewidth: 2
    }));

    curve.mesh.castShadow = true;

    splines.chordal = curve;
    for (var k in splines) {
        var spline = splines[k];
        scene.add(spline.mesh);

    }
    load([new THREE.Vector3(289, 452, 56),
        new THREE.Vector3(-53, 171, -14),
        new THREE.Vector3(-91, 176, -6),
        new THREE.Vector3(-383, 491, 47)
    ]);




}

function addSplineObject(position) {

    var object = new THREE.Mesh(geometry, new THREE.MeshLambertMaterial({
        color: Math.random() * 0xffffff
    }));
    object.material.ambient = object.material.color;
    if (position) {

        object.position.copy(position);

    } else {

        object.position.x = Math.random() * 1000 - 500;
        object.position.y = Math.random() * 600
        object.position.z = Math.random() * 800 - 400;

    }

    object.castShadow = true;
    object.receiveShadow = true;
    scene.add(object);
    splineHelperObjects.push(object);
    return object;

}

function addPoint() {
    splinePointsLength++;
    positions.push(addSplineObject().position);
    updateSplineOutline();
}

function removePoint() {
    if (splinePointsLength <= 4) {
        return;
    }
    splinePointsLength--;
    positions.pop();
    scene.remove(splineHelperObjects.pop());
    updateSplineOutline();
}

function updateSplineOutline() {
    scene.remove(extrusion);
    var p;

    for (var k in splines) {
        var spline = splines[k];
        splineMesh = spline.mesh;

        for (var i = 0; i < ARC_SEGMENTS; i++) {
            p = splineMesh.geometry.vertices[i];
            p.copy(spline.getPoint(i / (ARC_SEGMENTS - 1)));
        }
        splineMesh.geometry.verticesNeedUpdate = true;

        var extrudeSettings = {
            steps: 300 * splinePointsLength,
            bevelEnabled: false,
            extrudePath: spline
        };

        var pts = [];
        var numPts = 2;
        for (var i = 0; i < numPts * 2; i++) {
            var l = i % 2 == 1 ? 10 : 20;
            var a = i / numPts * Math.PI;
            pts.push(new THREE.Vector2(Math.cos(a) * l, Math.sin(a) * l));
        }

        var shape = new THREE.Shape(pts);
        var geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
        // var material = new THREE.MeshLambertMaterial({
        //     color: 0xff8800,
        //     wireframe: false
        // });
var material = new THREE.ShaderMaterial({
        uniforms: uniforms,
        vertexShader: shadersHolder.blob_vertex,
        fragmentShader: shadersHolder.fragment

    });
    material.transparent = true;
        extrusion = new THREE.Mesh(geometry, material);

        scene.add(extrusion);
        // scene.add(mesh);
    }
}

function load(new_positions) {
    while (new_positions.length > positions.length) {
        addPoint();
    }
    while (new_positions.length < positions.length) {
        removePoint();
    }
    for (i = 0; i < positions.length; i++) {
        positions[i].copy(new_positions[i]);
    }
    updateSplineOutline();

}

function animate() {
    uniforms.u_time.value += 0.01;
    requestAnimationFrame(animate);
    render();
    stats.update();
    controls.update();
    transformControl.update();

}

function render() {
    renderer.render(scene, camera);

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
