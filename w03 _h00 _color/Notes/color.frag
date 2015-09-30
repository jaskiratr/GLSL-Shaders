#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359

uniform vec2 u_resolution;
uniform float u_time;

// float plot(vec2 st, float pct){
//   return  smoothstep( pct-0.02, pct, st.y) - 
//           smoothstep( pct, pct+0.02, st.y);
// }

// // float doubleCircleSigmoid (float x, float a){
// //   float min_param_a = 0.0;
// //   float max_param_a = 1.0;
// //   a = max(min_param_a, min(max_param_a, a)); 

// //   float y = 0.;
// //   if (x<=a){
// //     y = a - sqrt(a*a - x*x);
// //   } else {
// //     y = a + sqrt(pow((1.-a),2.) - pow((x-1.),2.));
// //   }
// //   return y;
// // }

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution;
    vec4 color = vec4(0.);
    
    color.x += 1.0;
    color.y += 0.5;
    color.z += 0.0;
    color.w += 1.0;

    color.r += 0.0;
    color.g += 0.0;
    color.b += 0.0;
    color.a += 0.0;

    color.s += 0.0;
    color.t += 0.0;
    color.p += 0.0;
    color.q += 0.0;

    color[0] += 0.0;
    color[1] += 0.0;
    color[2] += 0.0;
    color[3] += 0.0;

    // color.rg = vec2(1.);

    // v.x = 1.;
    // vec3 color = 
    
    gl_FragColor = vec4(color);
}