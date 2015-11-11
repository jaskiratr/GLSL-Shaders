#ifdef GL_ES
precision mediump float;
#endif

uniform float u_time;
uniform vec2 u_resolution; 

float random (vec2 st) { 
    return fract(sin(dot(st.xy,vec2(12.9898,78.233)))* 43758.5453123);
}


void main() {

    vec2 st = gl_FragCoord.xy/u_resolution;
    st*=30.0;
    vec2 ipos = floor(st);  // get the integer coords
    vec2 i_st = fract(st);
    float pct = step(0.,1.);
    
    float itime = floor(u_time*20.); 
    ipos.y+=itime;
    vec3 color = vec3(random(ipos));
    // ipos.y+=itime;
    // color *= vec3(i_st.x);
    
    // color*= vec3(itime-1.);
	// color *= vec3(random(ipos*u_time/100000000.));


	gl_FragColor = vec4(vec3(pct)*color,1.0);

}