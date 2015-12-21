#ifdef GL_ES
precision mediump float;
#endif
#define PI 3.14159265359
uniform sampler2D u_tex0;
uniform vec2 u_tex0Resolution;

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float random (in vec2 st) { 
    return fract(sin(dot(st.xy,
                         vec2(12.9898,78.233)))* 
        43758.5453123);
}

float noise (in vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);

    // Four corners in 2D of a tile
    float a = random(i);
    float b = random(i + vec2(1.0, 0.0));
    float c = random(i + vec2(0.0, 1.0));
    float d = random(i + vec2(1.0, 1.0));

    vec2 u = f * f * (3.0 - 2.0 * f);

    return mix(a, b, u.x) + 
            (c - a)* u.y * (1.0 - u.x) + 
            (d - b) * u.x * u.y;
}

void main () {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    vec2 size = st;
    st*=2.;
    vec2 st_f = fract(st);
    vec2 st_i = floor(st);
    st.y*=1.4;

    //  if (mod(st_i.y,2.) == 1.) {
    //     st.x -= .5*sin(u_time);
    // }
    //  if (mod(st_i.x,2.) == 1.) {
    //     st.y -= .5*cos(u_time);
    // }

    float scale = 3.15;
    float offset = .4;
    
    float angle = noise(st)*2.5;
    float radius = offset;
    // st.y= 1.;
    st.y+=u_time/20.*size.x/5.;
    st.x-=u_time/30.;
    st *= scale;
    st += radius * vec2(cos(angle),sin(angle));
    vec4 color = vec4(0.0);
    color = texture2D(u_tex0,st);
    color.r += texture2D(u_tex0,st).r/4.;
    // color.r += texture2D(u_tex0,st/1.2).r;
    // color.g += texture2D(u_tex0,st/2.2).r;
    // color.b += texture2D(u_tex0,st/3.2).r;

    



    gl_FragColor = color;
}




