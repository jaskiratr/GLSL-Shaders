#ifdef GL_ES
precision mediump float;
#endif

uniform float u_time;
uniform vec2 u_resolution;
uniform vec2 u_mouse;  

void main() {

    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    float timeA = abs(sin(u_time/3.));
    float x1 = sin(timeA);
    float y1 = cos(timeA);

    vec2 center_sun = vec2(0.5);
    center_sun = vec2 (x1,y1/1.- .2);
    vec3 sun = vec3(1.0,1.0,0.3) *(length(gl_FragCoord.xy - (center_sun * u_resolution.xy)) < (u_resolution.x/40.0) ? 1.0 : 0.0);
    float halo = (length(gl_FragCoord.xy - center_sun * u_resolution.xy)-(u_resolution.x/40.0))/length(u_resolution.xy);
    float sunHaloExp = exp(-pow(halo,2.0)/(pow(0.05,2.2)));

    
    // st.x *= u_resolution.x / u_resolution.y;
    vec3 horizon = pow((st.y-1.5),25.)*vec3(0.5,0.7,1.0);
    // vec3 horizon = pow(abs(st.y*cos(u_time)/2.-1.),20.)*vec3(0.5,0.7,1.0);
    vec3 color = vec3(0.);

    
    // float sun = length(gl_FragCoord.xy - (u_resolution.xy*0.5) - vec2(50.0*x1, 50.0*y1));
    
    color = vec3(step(.1,sun)+sun);

    gl_FragColor = vec4(horizon+sun+sunHaloExp,1.0);
}


