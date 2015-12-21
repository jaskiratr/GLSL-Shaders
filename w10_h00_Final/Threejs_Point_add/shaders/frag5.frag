// #ifdef GL_ES
// precision mediump float;
// #endif

#define CI vec3(.62,.89,.80)   // innermost
#define CO vec3(.76,.90,.85)  //Backgound
#define CM vec3(.02,.34,.59)  // Middle 
#define CE vec3(.63,.81,.75)


uniform vec2 u_resolution;
varying vec2 st;
uniform vec2 u_mouse;
uniform float u_time;
uniform vec2 u_points[20];
////////////////////



float random (vec2 st) { 
    return fract(sin(dot(st.xy,
                         vec2(12.9898,78.233)))* 
        43758.5453123);
}


float metaball(vec2 p, float r)
{
  return r / dot(p, p);
}

vec3 sample(in vec2 uv)
{

  float r = metaball(uv + vec2(.0,.90), .0007);
        
  for(int i = 0; i<20; i++){
    if (u_points[i].x != 0.){
      r*=metaball(uv + vec2(u_points[i].x, u_points[i].y), .00919);
    }
  }

  vec3 c = (r > .3 && r < 1.)
        ? (vec3(step(.5, r)) * CE)
        : (r < 1.9 ? (r < .8 ? CO: CM) : CI);

  return c;
}


float noise_v(vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);
    vec2 u = f*f*(3.0-2.0*f);
    return mix( mix( random( i + vec2(0.0,0.0) ), 
                     random( i + vec2(1.0,0.0) ), u.x),
                mix( random( i + vec2(0.0,1.0) ), 
                     random( i + vec2(1.0,1.0) ), u.x), u.y);
}


void main()
{
    vec2 uv = st;
    uv.x = .99*uv.x+.01*noise_v(vec2(uv.x*20.+u_time , uv.y *20.+u_time*.5));
    uv.y = .99*uv.y+.01*noise_v(vec2(uv.x*20.+u_time*1.3 , uv.y *20.+u_time*.7));
    float  d = length( abs(uv)-.1 ); // Make the distance field
  
    vec3 color=sample(uv*(-1.));
    
    

    gl_FragColor = vec4(color,1.0);
    // gl_FragColor = vec4(vec3(c1),1.0);
}