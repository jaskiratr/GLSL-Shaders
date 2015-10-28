uniform float u_time;
uniform vec2 u_resolution;

varying vec2 st;
varying float noise;
uniform sampler2D texture;

float random( vec3 scale, float seed ){
    return fract( sin( dot( gl_FragCoord.xyz + seed, scale ) ) * 43758.5453 + seed ) ;
}

void main() {
    // vec3 color = vec3( st * ( 1. - 2.5 * noise ), 0.0 );
    float r = .01 * random( vec3( 12.9898, 78.233, 151.7182 ), 0.0 );
    // lookup vertically in the texture, using noise and offset
    vec2 tPos = vec2( 0, 1.0 - 1.3 * noise + r );
    vec4 color = texture2D( texture, tPos );

    gl_FragColor = vec4( color );
    // gl_FragColor = vec4( vec3( st, 0. ), 1. );
}

