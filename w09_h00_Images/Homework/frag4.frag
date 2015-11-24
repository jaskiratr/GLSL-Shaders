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
    color = texture2D(u_tex0,st/1.);

    float d = distance(st, vec2(0.5));
    d = smoothstep(0.,1.,sin(d*3.14*4.-u_time*5.));
    color.g *= texture2D(u_tex0,vec2(0.,0.)).g;
    color.r *= texture2D(u_tex0,vec2(d,d*2.)).r;
    color.g *= texture2D(u_tex0,vec2(0.,0.)).g;
    color.b *= texture2D(u_tex0,vec2(0.,0.)).b;
    // color.r += texture2D(u_tex0,st/1.2).r;
    // color.g += texture2D(u_tex0,st/2.2).r;
    // color.b += texture2D(u_tex0,st/3.2).r;

    



    gl_FragColor = color;
}




