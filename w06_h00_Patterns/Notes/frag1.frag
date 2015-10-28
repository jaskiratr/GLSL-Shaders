// Uniforms defined in : https://github.com/patriciogonzalezvivo/glslCanvas
//Environment : http://patriciogonzalezvivo.com/2015/thebookofshaders/edit.html#02/hello_world.frag

#ifdef GL_ES
precision mediump float;
#endif

uniform float u_time;
uniform vec2 u_resolution; 

float cirle(vec2 st, float rad){

	st -= .5;
	return 1.0-step(rad*.05,dot(st,st)*2.);
}

float rand(vec2 co){
    return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);
}

float cirle2(vec2 st, float rad){
	float speed = u_time/10000.;
	vec2 sta= st;
	vec2 stb= st;
	st -= rand(vec2(speed/2.,-100.));
	st.y -= rand(vec2(speed*u_time/1000.,-1000.));
	return 1.0-step(rad*.05,dot(st,st*2.)*10.);
}

void main() {

    vec2 st = gl_FragCoord.xy/u_resolution;
    vec2 st2 = st;
    st*=30.0;
    st = fract (st);
    float pct = cirle (st,5.);
    pct += cirle2 (st2,.4);
	gl_FragColor = vec4(vec3(pct),1.0);

}