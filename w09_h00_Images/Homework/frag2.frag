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
    st*=4.;
    vec2 st_f = fract(st);
    vec2 st_i = floor(st);

     if (mod(st_i.y,2.) == 1.) {
        st.x -= .5*sin(u_time);
    }
     if (mod(st_i.x,2.) == 1.) {
        st.y -= .5*cos(u_time);
    }

    vec4 color = vec4(0.0);
    color = texture2D(u_tex0,st/2.);
    // color.r += texture2D(u_tex0,st_f).r;
    // color.r += texture2D(u_tex0,st/1.2).r;
    // color.g += texture2D(u_tex0,st/2.2).r;
    // color.b += texture2D(u_tex0,st/3.2).r;

    



    gl_FragColor = color;
}




