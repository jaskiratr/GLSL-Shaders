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
    st -=.5;
    
    // float pct = 1. - length(st)*2.;
//--------------
    float pct = 1. - length(st)*2.;
    pct = fract(pct*2.);
//--------------
    // float pct = 1. - length(st)*2.;
    // pct = fract(pct*2.);
    // pct = step(.5,pct);
//--------------
    // float pct = 1. - length(st)*10.;
    // pct = fract(pct*2.+u_time);
    // pct = step(.5,pct);

    color = vec3(pct);
    gl_FragColor = vec4(color,1.0);
}