#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359
#define TWO_PI 6.28318530718

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

vec3 hsb2rgb( in vec3 c ){
    vec3 rgb = clamp(abs(mod(c.x*6.0+vec3(0.0,4.0,2.0),
                             6.0)-3.0)-1.0, 
                     0.0, 
                     1.0 );
    rgb = rgb*rgb*(3.0-2.0*rgb);
    return c.z * mix( vec3(1.0), rgb, c.y);
}

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution;
    vec3 color = vec3(0.0);
    // Smooth interpolation between 0.1 and 0.9
   
    float red = smoothstep(0.,0.1,st.y)-smoothstep(0.1,0.4,st.y);
    float green = smoothstep(0.2,0.3,st.y)-smoothstep(0.3,0.6,st.y);
    float blue = smoothstep(0.4,0.5,st.y)-smoothstep(0.5,0.6,st.y);
    // float yellow = smoothstep(0.,0.5,st.y)-smoothstep(0.4,0.8,st.y);
    // float yellow = smoothstep(0.,0.5,st.y)-smoothstep(0.4,0.8,st.y);

    vec2 toCenter = vec2(0.5)-st;
    float angle = atan(toCenter.y,toCenter.x);
    float radius = length(toCenter)*2.0;

    // color = hsb2rgb(vec3((angle/TWO_PI)+0.5,radius,1.0));

    color += vec3(1.0,0.0,0.0)*red;
    color += vec3(0.0,1.0,0.0)*green;
    color += vec3(0.0,0.0,1.0)*blue;
    
//     float pct = plot(st,y);
//     color = (1.0-pct)*color+pct*vec3(0.0,1.0,0.0);

    gl_FragColor = vec4(color,1.0);
}