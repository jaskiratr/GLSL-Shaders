// Uniforms defined in : https://github.com/patriciogonzalezvivo/glslCanvas
//Environment : http://patriciogonzalezvivo.com/2015/thebookofshaders/edit.html#02/hello_world.frag
#define SMOOTH(r,R) (1.0-smoothstep(R-1.0,R+1.0, r))

varying vec2 st;
varying float noise;
uniform float u_time;
uniform vec2 u_resolution; 

// adapted from http://www.youtube.com/watch?v=qNM0k522R7o
float itime = floor(u_time*4.);

float random (float co) { 
    return fract(sin(dot(co,
                         (12.9898,78.233)))* 43758.5453123);
}

float cirle(vec2 st, float rad){

	st -= .5;
	return 1.0-step(rad*.05,dot(st,st)*2.);
}

float circle2(vec2 st, float rad){
    st -= .5;

    float dist =  sqrt(dot(st, st));
    float t = 1.0 + smoothstep(rad, rad+0.05, dist) 
                - smoothstep(rad-0.05, rad, dist);
    return t;
    // gl_FragColor = mix(circle_color, bkg_color,t);
}

float arcs(vec2 st, float rad, float width, float opening)
{
    st -= .5;
    float r = sqrt( dot( st, st ) );
    st = normalize(st);
    
    if( abs(st.y) > random(itime) )
        return 1.;
    else
        return 0.;
}




void main() {
 
    float pct = arcs(st,.2,10.,1.8*abs(sin(u_time)));
    pct *= cirle (st,4.)-cirle (st,3.);
    
    // pct *= 1.-circle2(st ,.3);
    vec4 color = pct* vec4(1.0,0.1,0.4,1.0*pct);
    gl_FragColor = vec4(color);

}





