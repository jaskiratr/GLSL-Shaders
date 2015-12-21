#ifdef GL_ES
precision mediump float;
#endif

#define CI vec3(.9,.1,.5)
#define CO vec3(.2)
#define CM vec3(.0)
#define CE vec3(.3,.9,.8)

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;
////////////////////

vec3 mod289(vec3 x)
{
  return x - floor(x * (1.0 / 289.0)) * 289.0;
}

vec4 mod289(vec4 x)
{
  return x - floor(x * (1.0 / 289.0)) * 289.0;
}

vec4 permute(vec4 x)
{
  return mod289(((x*34.0)+1.0)*x);
}

vec4 taylorInvSqrt(vec4 r)
{
  return 1.79284291400159 - 0.85373472095314 * r;
}

vec3 fade(vec3 t) {
  return t*t*t*(t*(t*6.0-15.0)+10.0);
}

// Classic Perlin noise, periodic variant
float pnoise(vec3 P, vec3 rep)
{
  vec3 Pi0 = mod(floor(P), rep); // Integer part, modulo period
  vec3 Pi1 = mod(Pi0 + vec3(1.0), rep); // Integer part + 1, mod period
  Pi0 = mod289(Pi0);
  Pi1 = mod289(Pi1);
  vec3 Pf0 = fract(P); // Fractional part for interpolation
  vec3 Pf1 = Pf0 - vec3(1.0); // Fractional part - 1.0
  vec4 ix = vec4(Pi0.x, Pi1.x, Pi0.x, Pi1.x);
  vec4 iy = vec4(Pi0.yy, Pi1.yy);
  vec4 iz0 = Pi0.zzzz;
  vec4 iz1 = Pi1.zzzz;

  vec4 ixy = permute(permute(ix) + iy);
  vec4 ixy0 = permute(ixy + iz0);
  vec4 ixy1 = permute(ixy + iz1);

  vec4 gx0 = ixy0 * (1.0 / 7.0);
  vec4 gy0 = fract(floor(gx0) * (1.0 / 7.0)) - 0.5;
  gx0 = fract(gx0);
  vec4 gz0 = vec4(0.5) - abs(gx0) - abs(gy0);
  vec4 sz0 = step(gz0, vec4(0.0));
  gx0 -= sz0 * (step(0.0, gx0) - 0.5);
  gy0 -= sz0 * (step(0.0, gy0) - 0.5);

  vec4 gx1 = ixy1 * (1.0 / 7.0);
  vec4 gy1 = fract(floor(gx1) * (1.0 / 7.0)) - 0.5;
  gx1 = fract(gx1);
  vec4 gz1 = vec4(0.5) - abs(gx1) - abs(gy1);
  vec4 sz1 = step(gz1, vec4(0.0));
  gx1 -= sz1 * (step(0.0, gx1) - 0.5);
  gy1 -= sz1 * (step(0.0, gy1) - 0.5);

  vec3 g000 = vec3(gx0.x,gy0.x,gz0.x);
  vec3 g100 = vec3(gx0.y,gy0.y,gz0.y);
  vec3 g010 = vec3(gx0.z,gy0.z,gz0.z);
  vec3 g110 = vec3(gx0.w,gy0.w,gz0.w);
  vec3 g001 = vec3(gx1.x,gy1.x,gz1.x);
  vec3 g101 = vec3(gx1.y,gy1.y,gz1.y);
  vec3 g011 = vec3(gx1.z,gy1.z,gz1.z);
  vec3 g111 = vec3(gx1.w,gy1.w,gz1.w);

  vec4 norm0 = taylorInvSqrt(vec4(dot(g000, g000), dot(g010, g010), dot(g100, g100), dot(g110, g110)));
  g000 *= norm0.x;
  g010 *= norm0.y;
  g100 *= norm0.z;
  g110 *= norm0.w;
  vec4 norm1 = taylorInvSqrt(vec4(dot(g001, g001), dot(g011, g011), dot(g101, g101), dot(g111, g111)));
  g001 *= norm1.x;
  g011 *= norm1.y;
  g101 *= norm1.z;
  g111 *= norm1.w;

  float n000 = dot(g000, Pf0);
  float n100 = dot(g100, vec3(Pf1.x, Pf0.yz));
  float n010 = dot(g010, vec3(Pf0.x, Pf1.y, Pf0.z));
  float n110 = dot(g110, vec3(Pf1.xy, Pf0.z));
  float n001 = dot(g001, vec3(Pf0.xy, Pf1.z));
  float n101 = dot(g101, vec3(Pf1.x, Pf0.y, Pf1.z));
  float n011 = dot(g011, vec3(Pf0.x, Pf1.yz));
  float n111 = dot(g111, Pf1);

  vec3 fade_xyz = fade(Pf0);
  vec4 n_z = mix(vec4(n000, n100, n010, n110), vec4(n001, n101, n011, n111), fade_xyz.z);
  vec2 n_yz = mix(n_z.xy, n_z.zw, fade_xyz.y);
  float n_xyz = mix(n_yz.x, n_yz.y, fade_xyz.x); 
  return 2.2 * n_xyz;
}


float random (vec2 st) { 
    return fract(sin(dot(st.xy,
                         vec2(12.9898,78.233)))* 
        43758.5453123);
}

float turbulence( vec3 p ) {
    float t = -.5;
    for (float f = 1.0 ; f <= 5. ; f++ ){
        float power = pow( 1.6, f);
        t += abs( pnoise( vec3( power * p ), vec3( 0.,10.,2. ) ) / power);
    }
    return t;
}

float metaball(vec2 p, float r)
{
  return r / dot(p, p);
}

vec3 sample(in vec2 uv)
{
  float t0 = sin(u_time * 1.9) * .46;
  float t1 = sin(u_time * 2.4) * .49;
  float t2 = cos(u_time * 1.4) * .57;

  float r = metaball(uv + vec2(.8,.8), .1)*
        metaball(uv + vec2(-.8,-.8), .1)*
        metaball(uv + vec2(0., 0.0), .59);

  vec3 c = (r > .4 && r < .7)
        ? (vec3(step(.1, pow(r,2.))) * CE)
        : (r < .9 ? (r < .8 ? CO: CM) : CI);

  return c;
}


void main()
{
    vec2 uv = gl_FragCoord.xy/u_resolution.xy;
    // vec2 pos = vec2(u_mouse.x,u_mouse.y)-uv;
    // uv= length(pos)*(uv*.1)/29.-1.5;

    float noise = 10.0 *  -.1 * turbulence(1.1 * vec3(uv.x,uv.y,u_time/50.) + u_time/50.);
    uv.x = .9*uv.x+.1*noise;
    float  d = length( abs(uv)-.1 ); // Make the distance field
    // uv*=fract(d);
    vec3 color=sample(uv*(-2.)+1.);
    // color=fract(d*10.0);
    // // st1.x = length(noise);
    // // st1.y = length(st1-0.5);
    
    // vec3 color = vec3(0.0);
    // color = mix(vec3(1.10961,1.9019608,2.666667),    // CHANGE
    //             vec3(1.167,1.86667,2.0),
    //             clamp(1.,noise*8.,noise*10.));
    // color=fract(color*10.0);

    // vec3 color1 = vec3(.5,.8,.1);
    // vec3 c1 = vec3(0.);
    
            
    // float r = length(pos)*20.0*noise;
    // float a = atan(pos.y,pos.x);
    // // c1 = circle(mouseX,mouseY,r,color1);
    // float f = abs(cos(a*30.5))*.2+.1;
    // c1 =color*color*vec3(14.,0.1,0.1);
    // c1+= vec3( 1.-smoothstep(f,f+0.02,r) );    

    gl_FragColor = vec4(color,1.0);
    // gl_FragColor = vec4(vec3(c1),1.0);
}