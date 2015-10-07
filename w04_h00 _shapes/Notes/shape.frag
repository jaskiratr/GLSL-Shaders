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
    // float pct = step(.2,st.x)-step(.8,st.x);

    // float pct = step(.2,st.x)-step(.8,st.x);
    // pct+=step(.2,st.y)-step(.8,st.y);

    // float pct = step(.2,st.x)-step(.8,st.x);
    // pct*=step(.2,st.y)-step(.8,st.y);

    float pct = min(step(.2,st.x)-step(.8,st.x) ,step(.2,st.y)-step(.8,st.y) );
    

    color = vec3(pct);
    gl_FragColor = vec4(color,1.0);
}