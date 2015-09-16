#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

// Plot a line on Y using a value between 0.0-1.0
float plot(vec2 st, float y){
  return  smoothstep( y, y-0.01, st.y) - smoothstep( y, y+0.3, st.y);
}

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    float movement = abs(sin(u_time)+cos(3.5*u_time))*0.3;
    // float y = pow((pow(st.x,1.)-.5),.40) * movement;
    float y = sqrt(pow(st.x-0.5,2.)-0.1*(sin(u_time*4.))); 
    // float y = sqrt(pow(st.x-0.5,2.)-0.1*(movement)); 

    y+=0.4;
    vec3 color = vec3(.0);
    
    // Plot a line
    float pct = plot(st,y);
    
    color = pct*vec3(1.,.9,0.7);
    
    gl_FragColor = vec4(color,1.0);
}