#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float random(vec2 co){
    return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);
}

void main(){
	vec2 st = gl_FragCoord.xy/u_resolution.xy;
 
// -----------------   	
	st *=vec2(-40.,2.);
    
	vec2 i_st = floor(st); // int blocks
	vec2 f_st = fract(st); // fraction

	float time = floor((u_time*10000.)); // seconds
	float pct = random(vec2(time+i_st.x));
	pct+= abs(sin(u_time*i_st.x*20.)/1.);
	// pct*= abs(sin(u_time*i_st.x/100.)/12.);	

	if(i_st.y == 1.){
		f_st.y = 1. - f_st.y-.5;
	}else{
		f_st.y -=.5;
	}

	f_st.y/=10.;
	vec3 color = vec3(step(pct,f_st.y)-step(.5,f_st.x));
   	gl_FragColor = vec4(color,1.0);
}