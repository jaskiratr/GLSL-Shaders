#ifdef GL_ES
precision mediump float;
#endif

uniform sampler2D u_tex0;
uniform vec2 u_tex0Resolution;

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

vec2 random2(vec2 st){
    st = vec2( dot(st,vec2(127.1,311.7)),
              dot(st,vec2(269.5,183.3)) );
    return -1.0 + 2.0*fract(sin(st)*43758.5453123);
}
// Value Noise by Inigo Quilez - iq/2013
// https://www.shadertoy.com/view/lsf3WH
float noise(vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);
    vec2 u = f*f*(3.0-2.0*f);
    return mix( mix( dot( random2(i + vec2(0.0,0.0) ), f - vec2(0.0,0.0) ), 
                     dot( random2(i + vec2(1.0,0.0) ), f - vec2(1.0,0.0) ), u.x),
                mix( dot( random2(i + vec2(0.0,1.0) ), f - vec2(0.0,1.0) ), 
                     dot( random2(i + vec2(1.0,1.0) ), f - vec2(1.0,1.0) ), u.x), u.y);
}


vec3 circle ( float posX, float posY, float rad, vec3 color){
    vec2 st = gl_FragCoord.xy/u_resolution;
    st.x -=posX;
    st.y -=posY;
    // float t = random2(st).y;
    float t = fract(u_time/4.);
    st += noise(st)*t; 
    float pct = 1.- length(st/1.)*u_time*rad;
    pct = step(.97,pct);
    color = vec3(pct)*color;
    return color;
}

void main () {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    vec2 uv = st;
    vec3 color1 = vec3(1.,1.8,.1);
    // vec3 color2 = vec3(.9,.4,.4);
    // vec3 color3 = vec3(.5,.8,.9);

    float t =  6.;
    st += noise(st*5.)*t; // Animate the coordinate space
    vec4 color = vec4(0.0);
    vec3 c = circle( .5,.5,.03,color1);
    vec4 shape = vec4 (c,1.);
    vec4 tex = texture2D(u_tex0,uv);
    color+=shape;
    color*=tex;
    // color.r += texture2D(u_tex0,st/.5).r;
    // color.r += texture2D(u_tex0,st/1x.2).r;
    // color.g += texture2D(u_tex0,st/2.2).r;
    // color.b += texture2D(u_tex0,st/3.2).r;

    



    gl_FragColor = color;
}




