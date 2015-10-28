#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float circle(vec2 st, float radius) {
    st -= .5;
    return 1.0-step(radius*.5,dot(st,st)*2.);
}
 

float stripes(vec2 st){
    return step(st.y,st.x);
    
}    
void main() {
	vec2 st = gl_FragCoord.xy/u_resolution;
    vec3 color = vec3(0.);
    
    st *= 10.;
    
    vec2 st_i = floor(st);
   
    if (mod(st_i.y,2.) == 1.) {
        // st.x -= .5*sin(u_time);
        st.x = 1.-st.x;
    }
     if (mod(st_i.x,2.) == 1.) {
        st.y= 1.-st.y;
        // st.y -= .5*cos(u_time);
    }
    
    
    vec2 st_f = fract(st);
    // color.rg = st_f;
    
    float pct = stripes(st_f);
    color += pct;
    
    
	gl_FragColor = vec4(color,1.0);
}
