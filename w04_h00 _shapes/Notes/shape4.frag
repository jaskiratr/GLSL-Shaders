#ifdef GL_ES
precision mediump float;
#endif

#define TWO_PI 6.28318530718

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;


void main(){
    vec2 st = gl_FragCoord.xy/u_resolution;
    vec3 color = vec3(0.0);
    
    // st = st *2.-1.;
    //remap space from -1 to 1

    st -= .5;

    float r = length(st)*2.;
    float a = atan (st.y,st.x)/3.1415;

    r = r*sin(abs(a));
    float f = abs(cos(a*4.))*.5+.2;
    float pct =  (1. - smoothstep(f,r));
    color = vec3(pct);

    // float shadow = smoothstep(.9,.4,pct)


    gl_FragColor = vec4(color,1.0);
}