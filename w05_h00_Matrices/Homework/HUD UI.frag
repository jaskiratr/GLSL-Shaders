// Author @patriciogv - 2015
// http://patriciogonzalezvivo.com

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


float circle (vec2 st, float rad ){
  float dist =  sqrt(dot(st/.2, st/.2));
  float border = 0.01;
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

    
    color += cross(pos.xy,0.04);
    color += circle(pos.xy,.3);
    rotate(-u_time);
    
    for(float i=0.; i<10.; i++){
      pos = vec3(st,i*.4); 
      pos = matrix * pos;
      color += box(pos.xy,vec2(0.04))*vec3(1.,0.4,0.1); 
    }
    
    
    // pos = matrix * pos;
    // color += box(pos.xy,vec2(0.04));
    
    // gl_FragColor = mix(color, color,t);
    gl_FragColor = vec4(color,1.0);
}