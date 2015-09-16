#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359

uniform vec2 u_resolution;
uniform float u_time;

float plot(vec2 st, float pct){
  return  smoothstep( pct-0.02, pct, st.y) - 
          smoothstep( pct, pct+0.02, st.y);
}


float impulse( float k, float x )
{
    float h = k*x;
    return h*exp(1.0-h);
}

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution;

    
    float y = impulse(st.x,8.*abs(sin(u_time/2.)));

    vec3 color = vec3(0.);

    float pct = plot(st,y);
    // color = (1.0-pct)*color+pct*vec3(0.0,1.0,0.0);
    color = mix(color,vec3(0.0,1.0,0.0),pct);
    
    
    gl_FragColor = vec4(color,1.0);
}