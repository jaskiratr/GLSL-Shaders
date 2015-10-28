#ifdef GL_ES
precision mediump float;
#endif

uniform float u_time;
uniform vec2 u_resolution; 

float cirle(vec2 st, float rad){

	st -= .5;
	return 1.0-step(rad*.05,dot(st,st)*2.);
}


float random (vec2 st) { 
    return fract(sin(dot(st.xy,
                         vec2(12.9898,78.233)))* 
        43758.5453123);
}


void main() {

    vec2 st = gl_FragCoord.xy/u_resolution;
    st*=40.0;
    vec2 ipos = floor(st);  // get the integer coords
    st = fract (st);
    float pct = cirle (st,2.);
    

    
    float itime = floor(u_time*2.); 
    vec3 color = vec3(random(ipos*itime));
	// color *= vec3(random(ipos*u_time/10000000.));


	gl_FragColor = vec4(vec3(pct)*color,1.0);

}