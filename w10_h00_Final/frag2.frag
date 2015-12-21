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
    st += noise(st*1.)*t; 
    float pct = 1.- length(st/4.)*5.*rad;
    pct = step(.997,pct);
    color = vec3(pct)*color;
    return color;
}

void main () {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    vec2 uv = st;
    vec4 color1 = vec4(1.,1.1,.1,1.);
    vec4 tex = texture2D(u_tex0,uv);

    float fade_out = 1.-fract(u_time/2.);    // SAW TOOTH FUNCTION
    float border = abs(sin(fade_out/2.)); // 0.01
    float circle_radius= 1.-(fade_out); // 0.5
    
    vec4 circle_color= vec4(1.0, 1.0, 1.0, fade_out);
    vec2 circle_center= vec2(0.5, 0.5);

    
  
    vec4 bkg_color = vec4(0.1);
 
    // Offset st with the center of the circle.
    st = st - circle_center;
    circle_color*=1.1*tex;
    // float dist =  sqrt(dot(st/.2, circle_center*2.)); //????
    // float dist =  sqrt(st.x*st.x+st.y*st.y); //r^2 = x^2 + y^2 // Equation of circle
    float dist =  sqrt(dot(st/.2, st/.2))+noise(st*50.*fade_out+u_time); //Equation of circle using dot product
 
    float t = 1.0 + smoothstep(0., border+0.5, dist) 
                - smoothstep(0.5-border, 0., dist);
 
    gl_FragColor = mix(circle_color, bkg_color,t);

    



    
}




