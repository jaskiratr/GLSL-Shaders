#ifdef GL_ES
precision mediump float;
#endif

uniform float u_time;
uniform vec2 u_resolution;
uniform vec2 u_mouse;  

void main() {

    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    float timeA = abs(sin(u_time/3.));
    // float x1 = sin(timeA);
    // float y1 = cos(timeA);

    float x1 = u_mouse.x/u_resolution.x;
    float y1 = u_mouse.y/u_resolution.y;


    vec2 center_sun = vec2(0.5);
    center_sun = vec2 (x1,y1);
    vec3 sun = vec3(1.0,1.0,1.0) *(length(gl_FragCoord.xy - (center_sun * u_resolution.xy)) < (u_resolution.x/20.0) ? 1.0 : 0.0);
    float halo = (length(gl_FragCoord.xy - center_sun * u_resolution.xy)-(u_resolution.x/40.0))/length(u_resolution.xy);

    

    float sunHaloExp = 3.*exp(-pow(halo,2.0)/(pow(1.-y1,8.2)));

    
    // st.x *= u_resolution.x / u_resolution.y;
    //     vec3 sky_horizonColor = mix(vec3(0.8,0.4,0.1),vec3(0.5,0.7,1.0),pow(sunPosition.y,0.3));
//     vec3 sky_Color = mix(vec3(0.,0.,0.1),vec3(0.2,0.2,0.7),pow(sunPosition.y,0.3));
    vec3 horizon_blue = pow((st.y-1.5),25.)*vec3(0.5,0.7,1.0);
    vec3 horizon_orange = pow((st.y-1.5),25.)*vec3(1.,0.4,0.1);

    vec3 horizon = mix(horizon_blue,horizon_orange,pow(1.6-y1,3.9));
    // vec3 horizon = pow(abs(st.y*cos(u_time)/2.-1.),20.)*vec3(0.5,0.7,1.0);
    vec3 color = vec3(0.);

    
    // float sun = length(gl_FragCoord.xy - (u_resolution.xy*0.5) - vec2(50.0*x1, 50.0*y1));
    // vec3 disperse = 1.-mix(horizon,vec3(1.0,1.0,1.0),pow(y1,3.9));
    color = vec3(step(.1,sun)+sun);

    gl_FragColor = vec4(horizon+sun+sunHaloExp,1.0);
    // gl_FragColor = vec4(horizon+sun,1.0);
}


