#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

void main(){
    vec2 st = gl_FragCoord.xy/u_resolution;
    float pct = 0.0;
    
    pct = pow(distance(st,vec2(.4)),distance(st,vec2(sin(u_time)/3.+.5)));

    // b. The LENGTH of the vector 
    //    from the pixel to the center 
    // vec2 toCenter = vec2(0.5)-st;
    // pct = length(toCenter);

    // c. The SQUARE ROOT of the vector 
    //    from the pixel to the center 
    vec2 tC = 2.*vec2(0.4)-st;
    pct -= 1.*sqrt(tC.x*tC.x*.2+tC.y*tC.y*.2);

    vec3 color = vec3(pct);

    gl_FragColor = vec4( color, 1.0 );
}