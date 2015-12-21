varying vec2 st;

void main() {

    st = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

}