varying vec2 st;    

uniform float u_time;
uniform vec2 u_resolution; 

float circle(vec2 st, float rad){

	st -= .5;
	return 1.0-step(rad*.05,dot(st,st)*2.);
}


float random (vec2 st) { 
    return fract(sin(dot(st.xy,vec2(12.9898,78.233)))* 43758.5453);
}


void main() {
    vec2 xy = st;
    // vec2 st = gl_FragCoord.xy/u_resolution;
    xy*=70.0;
    vec2 ipos = floor(xy);  // get the integer coords
    xy = fract(xy);
    float pct = circle (xy,1.);
    

    float itime = floor(u_time*2.); 
    vec3 color = vec3(random(ipos*itime));
	color *= vec3(random(ipos/12000.));
    color *= vec3(1.0,0.1,0.4);

	gl_FragColor = vec4(vec3(pct)*color,1.0*pct);

}