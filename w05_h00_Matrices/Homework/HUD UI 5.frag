#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

mat3 matrix = mat3(vec3(1.,0.,0.),
                   vec3(0.,1.,0.),
                   vec3(0.,0.,1.));

float box(vec2 st, vec2 size){
    st += .5;
    size = vec2(0.5) - size*0.5;
    vec2 uv = smoothstep(size,size+vec2(0.001),st);
    uv *= smoothstep(size, size+vec2(0.001), vec2(1.0)-st);
    return uv.x*uv.y;
}


float cross(vec2 st, float size){
    return  box(st, vec2(size,size/4.)) + 
            box(st, vec2(size/4.,size));
}
float grid(vec2 st, float size){
    return  box(st, vec2(size,size/99.)) + 
            box(st, vec2(size/99.,size));
}


float circle (vec2 st, float rad ){
  float dist =  sqrt(dot(st/.2, st/.2));
  float border = 0.03;
  return - smoothstep(rad, rad+border, dist) 
                + smoothstep(rad-border, rad, dist);
}

void scale(in vec2 f) {
    matrix = mat3(vec3(f.x,0.0,0.0),
                vec3(0.0,f.y,0.0),
                vec3(0.0,0.0,1.0)) * matrix;
}

void translate(vec2 f) {
  matrix = mat3(vec3(1.0,0.0,0.0),
                vec3(0.0,1.0,0.0),
                vec3(f.x,f.y,1.0)) * matrix;
}

void rotate(float a) {
    matrix = mat3(vec3(cos(a),-sin(a),0.0),
                vec3(sin(a),cos(a),0.0),
                vec3(0.0,0.0,1.0)) * matrix;
}

vec3 colorByDistance(float dst, float falloff, vec3 color, vec3 oldColor)
{
  return mix(color, oldColor, smoothstep(0.0, falloff, dst));
}

void main(){
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    vec3 color = vec3(0.0);
    vec3 pos = vec3(st,1.0);
    float halo = 0.;
    translate(vec2(-.5));
    // scale(vec2(sin(u_time)));
    // rotate(u_time);
    pos = matrix * pos;
    
    
      color += grid(pos.xy,0.9)*vec3(.9,.3,.3)*(pow((st.y),15.)+pow((1.-st.y),10.)+pow((st.x),10.)+pow((1.-st.x),10.));
      color += circle(pos.xy,.2)*vec3(.9,.3,.3);
      st *= 3.;
      st = fract(st);
      translate(st);
      pos = matrix * pos;
  
      color += grid(pos.xy,1.);
    for(float i=0.; i<6.; i++){
      rotate(u_time/3.);
      pos = matrix * pos;
          
      color += cross(pos.xy,0.2);
      color += circle(pos.xy,.9)*3.*colorByDistance(2.,4.9,vec3(1.,.4,.2),vec3(.2,.1,.2)); 
      
    }
    
    // for(float i=0.; i<10.; i++){
    //   pos = vec3(st,i*.4); 
    //   pos = matrix * pos;

    //   color += box(fract(pos.xy/2.),vec2(0.040))*vec3(1.,0.4,0.1); 
    //   color += box(fract((pos.xy-.46)/3.),vec2(0.04))*vec3(1.,0.4,0.1); 
    //   color += box(fract((pos.xy-.42)/3.),vec2(0.04))*vec3(1.,0.4,0.1); 
    //   color += box(fract((pos.xy-.50)/3.),vec2(0.03))*vec3(1.,0.4,0.1); 
    //   color += box(fract((pos.xy-.51)/3.),vec2(0.03))*vec3(1.,0.4,0.1); 

 
    // }

    
    
    // pos = matrix * pos;
    // color += box(pos.xy,vec2(0.04));
    
    // gl_FragColor = mix(color, color,t);
    gl_FragColor = vec4(color,1.0);
}