#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float random (in vec2 _st) { 
    return fract(sin(dot(_st.xy,
                         vec2(12.9898,78.233)))* 
        43758.5453123);
}

// Based on Morgan McGuire @morgan3d
// https://www.shadertoy.com/view/4dS3Wd
float noise (in vec2 _st) {
    vec2 i = floor(_st);
    vec2 f = fract(_st);

    // Four corners in 2D of a tile
    float a = random(i);
    float b = random(i + vec2(1.0, 0.0));
    float c = random(i + vec2(0.0, 1.0));
    float d = random(i + vec2(1.0, 1.0));

    vec2 u = f * f * (3.0 - 2. * f);

    return mix(a, b, u.x) + 
            (c - a)* u.y * (1.0 - u.x) + 
            (d - b) * u.x * u.y;
}

#define NUM_OCTAVES 4

float fbm ( in vec2 _st) {
    float v = 0.0;
    float a = 0.5;
    vec2 shift = vec2(10.0);
    // Rotate to reduce axial bias
    mat2 rot = mat2(cos(.15), sin(0.15), 
                    -sin(0.75), cos(0.30));
    for (int i = 0; i < NUM_OCTAVES; ++i) {
        v += a * noise(_st);
        _st = rot * _st * 2.1 + shift;
        a *= 0.5;
    }
    return v;
}

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy*4.;
    // st += st * abs(sin(u_time*0.1)*3.0);
    vec3 color = vec3(0.0);

    float fade_out = 1.-fract(u_time/2.);    // SAW TOOTH FUNCTION
    float border = abs(sin(fade_out/2.)); // 0.01
    float circle_radius= 1.-(fade_out); // 0.5
    
    vec4 circle_color= vec4(1.0, 1.0, 1.0, fade_out);
    // vec2 circle_center= vec2(5., 0.5);
    float dist =  sqrt(dot(st/.5-4., st/.5-4.))-noise(st*5.*fade_out+u_time); //Equation of circle using dot product
    float t = 1.0 + smoothstep(0., border+0.5, dist) 
                - smoothstep(0.5-border, 0., dist);
    vec4 bkg_color = vec4(0.1);
    vec2 q = vec2(0.);
    q.x = fbm( st + 0.00*u_time);
    q.y = fbm( st + vec2(1.0));

    vec2 r = vec2(0.);
    r.x = fbm( st + 1.0*q + vec2(1.7,9.2)+ 0.15*u_time );
    r.y = fbm( st + 1.0*q + vec2(8.3,2.8)+ 0.126*u_time);

    float f = fbm(st+r);

    color = mix(vec3(3.101961,1.919608,7.666667),
                vec3(3.666667,1.66667,1.498039),
                clamp((f*f)*3.0,.4,1.1));

    color = mix(color,
                vec3(1.6,.0,.7),
                clamp(length(q),.0,1.0));

    color = mix(color,
                vec3(1.,1.,1.1),
                clamp(length(r.x),0.0,1.0));

    // vec4 Mixcolor = mix(vec4(color,1.),bkg_color,t);
    vec4 Mixcolor =vec4(color,1.)*t;

    gl_FragColor = (Mixcolor);
}