#ifdef GL_ES
precision mediump float;
#endif

uniform sampler2D u_tex0;
uniform vec2 u_tex0Resolution;

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

void main () {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    vec4 color = vec4(0.0);
    color = texture2D(u_tex0,st/2.);
    color.r += texture2D(u_tex0,st/.5).r;
    // color.r += texture2D(u_tex0,st/1.2).r;
    // color.g += texture2D(u_tex0,st/2.2).r;
    // color.b += texture2D(u_tex0,st/3.2).r;

    



    gl_FragColor = color;
}




