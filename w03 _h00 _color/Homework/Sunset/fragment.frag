#ifdef GL_ES
precision mediump float;
#endif

uniform float u_time;
uniform vec2 u_resolution;


float F(float x, float peak, float width){
    float y = 0.0;
    width=width * 0.5;
    y = smoothstep(peak-width,peak,x) - smoothstep(peak,peak+width,x);
    return y;
}


void main() {

    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    float timeA = abs(sin(u_time/3.));
    // st.x *= u_resolution.x / u_resolution.y;
    vec3 horizon = pow((st.y-1.5),20.)*vec3(0.5,0.7,1.0);
    // vec3 horizon = pow(abs(st.y*cos(u_time)/2.-1.),20.)*vec3(0.5,0.7,1.0);
    vec3 color = vec3(0.);

    // vec2 p = vec2 (cos(u_time*0.5),sin(u_time*0.5))*.25+.5;
    float pct = F(st.y,sin(u_time*0.5),0.3);
    // pct *= F(st.y,p.y,.3);

    float x1 = sin(timeA);
    float y1 = cos(timeA);

    
    color = vec3(step(0.7,pct)+pct);

    gl_FragColor = vec4(horizon+color,1.0);
}


