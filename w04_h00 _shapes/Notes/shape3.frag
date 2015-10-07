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
    
    st = st *2.-1.;
    //remap space from -1 to 1

//--------------
    // float pct = 1. - length(abs(st)-.3)*10.;
    // pct = fract(pct*2.+u_time);
    // pct = step(.5,pct);
//--------------
    float pct = 1. - length(abs(st)-.3);
    // pct =1.- length(min(abs(st)-.3,0.0));
    pct = 1.-length(max(abs(st)-.3,0.0));
    // pct = step(.1,pct);

    color = vec3(pct);
    color = vec3(step(.9,pct)-step(.92,pct));

    gl_FragColor = vec4(color,1.0);
}