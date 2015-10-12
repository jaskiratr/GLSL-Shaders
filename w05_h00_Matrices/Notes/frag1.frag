#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float box(in vec2 st, in vec2 size){
    st +=  .5;
    size = vec2(0.5) - size*0.5;
    vec2 uv = smoothstep(size,
                        size+vec2(0.001),
                        st);
    uv *= smoothstep(size,
                    size+vec2(0.001),
                    vec2(1.0)-st);
    return uv.x*uv.y;
}

float cross(in vec2 st, float size){
    return  box(st, vec2(size,size/4.)) + 
            box(st, vec2(size/4.,size));
}

mat3 scaleMatrix(vec2 f){
  return mat3(vec3(f.x,0.0,0.0),
              vec3(0.0,f.y,0.0),
              vec3(0.0,0.0,1.));
}

mat3 translateMatrix(vec2 f){
  return mat3(vec3(1.0,0.0,0.0),
              vec3(0.0,1.0,0.0),
              vec3(f.x,f.y,1.));
}

mat3 rotateMatrix(float a){
  return mat3(vec3(cos(a),-sin(a),0.0),
              vec3(sin(a),cos(a),0.0),
              vec3(0.0,0.0,1.0));
}

vec3 scale (in vec2 f, inout vec3 pos){
  return scaleMatrix(f)*pos;
}

vec3 translate ( vec2 f, vec3 pos){
  return translateMatrix(f)*pos;
}

vec3 rotate ( vec2 a, vec3 pos){
  return translateMatrix(a)*pos;
}


void main(){
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    vec3 pos = vec3(st,1.0);

    // pos *= scaleMatrix(vec2(2.));
    
    // pos *= translateMatrix(vec2(.5));
    
    // pos -= .25;  // Move to zero
    // pos *= rotateMatrix(u_time);  // rotate
    
    pos = translate(vec2(-.5),pos)

    pos = rotate(u_time,translate(vec2(-.5),pos));


    gl_FragColor = vec4( vec3( cross(pos.xy,0.4) ) ,1.0);
}



