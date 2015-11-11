#ifdef GL_ES
precision mediump float;
#endif

uniform float u_time;
uniform vec2 u_resolution; 

float steps(vec2 st, float rad){

	st -= .5;
	return 1.0-step(1.,.0);
}


float random (vec2 st) { 
    return fract(sin(dot(st.xy,vec2(12.9898,78.233)))* 43758.5453123);
}


void main() {

    vec2 st = gl_FragCoord.xy/u_resolution;
    st*=30.0;
    vec2 ipos = floor(st);  // get the integer coords
    vec2 i_st = fract(st);
    float pct = steps(i_st,2.);
    
    float itime = floor(u_time*5.); 
    ipos+=itime/10.;
    vec3 color = vec3(random(ipos*itime));
    // color *= vec3(i_st.x);
    
    // color*= vec3(itime-1.);
	// color *= vec3(random(ipos*u_time/100000000.));


	gl_FragColor = vec4(vec3(pct)*color,1.0);

}