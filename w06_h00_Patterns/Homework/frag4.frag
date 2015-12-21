
#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float random (float co) { 
    return fract(sin(dot(co,
                         (12.9898,78.233)))* 43758.5453123);
}


void main(){
  vec2 st = gl_FragCoord.xy/u_resolution.xy;
  st.x *= u_resolution.x/u_resolution.y;
  vec3 color = vec3(0.0);
  float d = 0.0;

  // Remap the space to -1. to 1.
//   st = st *2.-1.;
for(int i=0;i<3;i++){

   d +=length( abs(vec2(st.x,random(float(i)*st.y)))-1. );    
}

    // Make the distance field
 
//   d += length( abs(st)-.15 );
//   d -= length( abs(st)-.4 );
//   d = length( min(abs(st)-.3,0.) );
  // d = length( max(abs(st)-.3,0.) );

  // Visualize the distance field
  gl_FragColor = vec4(vec3(fract(d*10.0)),1.0);

  // Drawing with the distance field
//   gl_FragColor = vec4(vec3( step(.3,d) ),1.0);
//   gl_FragColor = vec4(vec3( step(.3,d) * step(d,.4)),1.0);
//   gl_FragColor = vec4(vec3( smoothstep(.3,.4,d)* smoothstep(.6,.5,d)) ,1.0);
}




