#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

void main(){
  vec2 st = gl_FragCoord.xy/u_resolution.xy;
  st.x *= u_resolution.x/u_resolution.y;
  vec3 color = vec3(0.0);
  float d = 0.0;

  // Remap the space to -1. to 1.
  st = st *2.-1.;

  // Make the distance field
  d = length( abs(st) );
   
  // d = length( min(abs(st)-.3,0.) );
  // d = length( max(abs(st)-.3,0.) );
  d += .1 * sin(4. * st.x + 0.2 * u_time );
  d += .1 * cos(4. * st.y + .25 * u_time );
  // Visualize the distance field
  gl_FragColor = vec4(vec3(fract(d*25.0))*vec3(9.,1.7,.9),1.0);

  // Drawing with the distance field
  // gl_FragColor = vec4(vec3( step(.3,d) ),1.0);
  // gl_FragColor = vec4(vec3( step(.3,d) * step(d,.4)),1.0);
  // gl_FragColor = vec4(vec3( smoothstep(.3,.4,d)* smoothstep(.6,.5,d)) ,1.0);
}