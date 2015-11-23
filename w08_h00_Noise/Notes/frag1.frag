#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float random(float x){
    return fract(x*sin(10e5));
}

float random(vec2 xy){
    return random(dot(xy,vec2(1234.,5678.)));
}

void main(){
	vec2 st = gl_FragCoord.xy/u_resolution.xy;
 //    st.x *=90.;
    
 //    vec2 i_st = floor(st);
 //    vec2 f_st = fract(st);

 //    float time = floor(u_time*10.);
    
 //    vec3 color = vec3(random(time+i_st.x));
 //    color*= random((time*i_st.x));
 //    st.y/=.09;
 //    st.y-=.8;
 //    color+= sin(st.y)*random(time/20.+f_st.x);

	// gl_FragColor = vec4(color,1.0);
// -----------------
	// st *=vec2(10.,2.);
    
	// vec2 i_st = floor(st);
	// vec2 f_st = fract(st);

	// float time = floor(u_time*10.);
	// float pct = random(time+i_st.x);
	// vec3 color = vec3(step(pct,f_st.y));
 //   	gl_FragColor = vec4(color,1.0);

// -----------------   	
	st *=vec2(50.,2.);
    
	vec2 i_st = floor(st);
	vec2 f_st = fract(st);

	float time = floor(u_time*10.);
	float pct = random(time+i_st.x);

	if(i_st.y == 1.){
		f_st.y = 1. - f_st.y;
	}

	vec3 color = vec3(step(pct,f_st.y)-step(.3,f_st.x));
   	gl_FragColor = vec4(color,1.0);
}