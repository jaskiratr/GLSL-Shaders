
#define SMOOTH(r,R) (1.0-smoothstep(R-1.0,R+1.0, r))
#ifdef GL_ES
precision mediump float;
#endif

uniform float u_time;
uniform vec2 u_resolution; 

float random (float co) { 
    return fract(sin(dot(co,
                         (12.9898,78.233)))* 43758.5453123);
}

float cirle(vec2 st, float rad){

	st -= .5;
	return 1.0-step(rad*.05,dot(st,st)*2.);
}

float arcs(vec2 st, float radius, float width, float opening)
{
    st -= .5;
    float r = sqrt( dot( st, st ) );
    st = normalize(st);
    float itime = floor(u_time*4.);
    if( abs(st.y) > random(itime) )
        return SMOOTH(r-width/1.0,radius)-SMOOTH(r+width/2.0,radius);
    else
        return 0.0;
    // float segments = 0.;
    // if( mod((st.y),5.) > opening/3.)
    //     segments+= SMOOTH(r-width/1.0,radius)-SMOOTH(r+width/2.0,radius);
    
    // return segments;
}




void main() {
    vec2 st = gl_FragCoord.xy/u_resolution;
    
    // float pct = cirle (st,4.)-cirle (st,3.85);
    // pct *= arcs(st,.2,10.,.8*abs(sin(u_time)));
    // float pct = arcs(st,.2,10.,.8*abs(sin(u_time)));
    float pct = arcs(st,.2,10.,1.8*abs(sin(u_time)));
    pct *= cirle (st,4.)-cirle (st,3.85);

    vec3 color = pct* vec3(1.0,0.2,0.3);

	gl_FragColor = vec4(color,1.0);

}





