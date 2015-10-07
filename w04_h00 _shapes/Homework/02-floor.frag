#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

void main(){
    vec2 st = gl_FragCoord.xy/u_resolution;
    float pct = 0.0;

    // a. The DISTANCE from the pixel to the center
    pct = distance(st,vec2(0.5));

    pct = floor(st.x*12.*st.y*.8*abs(sin(u_time/3.)));
    pct *= sqrt(st.x*22.*st.y*.9*abs(cos(u_time/4.)));
    pct += sqrt(st.x*2.*st.y*.2*abs(cos(u_time/2.)));
    pct *= sqrt(st.x*2.*st.y*.2*abs(cos(u_time/5.)));

    vec3 color = vec3(pct);

    gl_FragColor = vec4( color, 1.0 );
}