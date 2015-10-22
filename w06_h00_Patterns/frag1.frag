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

void main() {

    vec2 st = gl_FragCoord.xy/u_resolution;
    st*=10.0;
    st = fract (st);
    float pct = cirle (st,5.);
	gl_FragColor = vec4(vec3(pct),1.0);

}