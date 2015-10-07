#ifdef GL_ES
precision mediump float;
#endif

#define TWO_PI 6.28318530718

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float square(float posX, float posY){
    float x = .3;
    vec2 st = gl_FragCoord.xy/u_resolution;
    // st = st *2.-1.;
    st.x = (st.x+posX) *(2.)-1.;    
    st.y = (st.y+posY) *(2.)-1.;

    float pct = 1. - length(abs(st)-x);
    pct = 1.-length(max(abs(st*2.)-.1,.0));
    pct = step(.9,pct)-step(.92,pct);

return pct;
}

void main(){
    // vec2 st = gl_FragCoord.xy/u_resolution;
    vec3 color = vec3(0.0);
    
    float sq = square(.0, .0);
    sq += square(-.5,-0.5);
    sq += square(.2,-0.2);

    color = vec3(sq);
    

    gl_FragColor = vec4(color,1.0);
}