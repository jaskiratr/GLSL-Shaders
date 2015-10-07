
#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;
#define TWO_PI 6.28318530718


vec3 hsb2rgb( in vec3 c ){
    vec3 rgb = clamp(abs(mod(c.x*6.0+vec3(0.0,4.0,2.0),
                             6.0)-3.0)-1.0, 
                     0.0, 
                     1.0 );
    rgb = rgb*rgb*(3.0-2.0*rgb);
    return c.z * mix( vec3(1.0), rgb, c.y);
}


void main(){
    vec2 st = gl_FragCoord.xy/u_resolution;
    float pct = 0.0;
    vec3 color = vec3(0.0);

    // Use polar coordinates instead of cartesian
    vec2 toCenter = vec2(0.5)-st;
    float angle = atan(toCenter.y,toCenter.x);
    float radius = length(toCenter)*2.0;
  
    color = hsb2rgb(vec3((angle/TWO_PI)+0.5,radius,1.0));

    pct = .9-(distance(st,vec2(0.5)));


    color *= vec3(pct);

    gl_FragColor = vec4( color, 1.0 );
}