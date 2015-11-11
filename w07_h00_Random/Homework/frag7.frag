#ifdef GL_ES
precision mediump float;
#endif

uniform float u_time;
uniform vec2 u_resolution; 

float random (vec2 st) { 
    return fract(sin(dot(st.xy,vec2(12.9898,78.233)))* 43758.5453123);
}
float random(in float x){
    return fract(sin(x)*43758.5453);
}

float text(vec2 st, float pos){
    st*= 4.;
    vec2 i_st = floor(st);

    // i_st*=4.;
    i_st.y+= pos*4.;
    // i_st.y*=4.;
    float color = step(0.5,random(i_st)); 

    // color+=1.;

    // color = step(0.5,color)*1000.;
    return color;
}

void main() {

    vec2 st = gl_FragCoord.xy/u_resolution;
    
    st*=30.0;
    vec2 i_st = floor(st);  // get the integer coords
    
    i_st.y+=floor(u_time*random(i_st.x)*40.);
    vec3 color = vec3(step(0.88,random(i_st)));
    // vec3 color = vec3(random(i_st));
    // i_st.y+=floor(u_time*random(i_st.x)*20.);
    color*= text(st,i_st.y);

    // vec3 color = vec3(text(st)*i_st.y);

    
    // i_st.y+=itime;
    // color *= vec3(i_st.x);
    
    // color*= vec3(itime-1.);
	// color *= vec3(random(i_st*u_time/100000000.));

    color*=vec3(.2,9.,.3);
	gl_FragColor = vec4(color,1.0);

}