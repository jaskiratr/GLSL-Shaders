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


void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    vec3 color = vec3(0.);
    
    vec3 a = vec3(0.7,0.1,0.2); // red
    vec3 b = vec3(0.07,0.3,0.4);  //blue
    
    // color = mix(a,b,1.);
    // color = mix(a,b,mod(u_time,1.));
// -----
    // float y = plot(st,.5);
    // color = mix(a,b,y);
// -----
    vec3 pct = vec3(st.x);

    pct.r = pow(pct.r,0.2);
    pct.g = sin(pct.g*2.);
    pct.b = pow(pct.b,0.4);

    color = mix (a,b,pct);

    color.r += plot (st,pct.r);
    color.g += plot (st,pct.g);
    color.b += plot (st,pct.b);
//-------
      
    gl_FragColor = vec4(color,1.);
}