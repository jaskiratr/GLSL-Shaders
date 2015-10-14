
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
    return (uv.x*uv.y);
}


float cross(vec2 st, float size){
    return  box(st, vec2(size,size/9.)) + 
            box(st, vec2(size/9.,size));
}

float crossGrid(vec2 st,vec2 size){
  // return sin(st.x*200.);
    st += .5;
    size = vec2(0.5) - size*0.5;
    vec2 uv = smoothstep(size,size+vec2(0.001),st);
    uv *= smoothstep(size, size+vec2(0.001), vec2(1.0)-st);
    return uv.x*uv.y;
}
float grid(vec2 st, float res){
    vec2 grid = fract(st*res);
    return 1.-(step(res,grid.x) * step(res,grid.y));
}


float circle (vec2 st, float rad ){
  float dist =  sqrt(dot(st/rad, st/rad));
  float border = 0.02;
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

void main(){
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    vec3 color = vec3(0.0);
    vec3 pos = vec3(st,1.0);
    
    translate(vec2(-.5));
    // scale(vec2(sin(u_time)));
    rotate(u_time);
    pos = matrix * pos;

    
    color += circle(pos.xy,.6);
    color += cross(pos.xy,0.24);
    color += circle(pos.xy,.33);
    rotate(-u_time);
    
    for(float i=0.; i<10.; i++){
      pos = vec3(st,i*.4); 
      pos = matrix * fract(pos*sin(u_time/2.));

      
      color += box(pos.xy,vec2(0.04))*vec3(1.,0.4,0.1); 
      // color += box(pos.xy,vec2(0.04))*vec3(1.,0.4,0.1); 
    }

    color += box(pos.xy,vec2(0.4))*vec3(1.,0.4,0.1); 
    

    vec2 grid_st = st*300.;
    color += vec3(0.5,0.,0.)*grid(grid_st,0.02);
    
    color += vec3(.12)*grid(grid_st,0.1);
    

    float dots =1.- step(fract(st.x*100.),0.5);
    dots += - step(fract(st.y*100.),0.5);
    color *= dots;
    
    gl_FragColor = vec4(color,1.0);
}