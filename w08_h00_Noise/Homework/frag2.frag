#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

vec2 hash( vec2 p )
{
	p = vec2( dot(p,vec2(127.1,311.7)),
			  dot(p,vec2(269.5,183.3)) );

	return -1.0 + 2.0*fract(sin(p)*43758.5453123);
}

float noise( in vec2 p )
{
    vec2 i = floor( p );
    vec2 f = fract( p );
	
	vec2 u = f*f*(3.0-2.0*f);

    return mix( mix( dot( hash( i + vec2(0.0,0.0) ), f - vec2(0.0,0.0) ), 
                     dot( hash( i + vec2(1.0,0.0) ), f - vec2(1.0,0.0) ), u.x),
                mix( dot( hash( i + vec2(0.0,1.0) ), f - vec2(0.0,1.0) ), 
                     dot( hash( i + vec2(1.0,1.0) ), f - vec2(1.0,1.0) ), u.x), u.y);
}

// -----------------------------------------------

void main()
{
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    vec2 fog = vec2(st.x,sin(st.y));
	// vec2 st = p*vec2(iResolution.x/iResolution.y,1.0);
	
	float f = 0.0;
	
    
		st*=10.0*st.y*st.y;

		st.y+=u_time;
		st.x+=u_time/2.;
        mat2 m = mat2( 1.6,  1.2, -1.3,  1.6 );
		f  = 0.4000*noise(st);
		st = m*st;
		// m = mat2( 1.6,  8., -3.102,  1.6 );
		f += 0.200*noise(st);
		st = m*st;
		f += .0150*noise(st);
		st = m*st;
		f += 0.0525*noise(st);
		st = m*st;
	

	f = 0.5 + 0.5*f;
	
   // f *= smoothstep( 0.0, 0.05, abs(p.x-0.6) );	
	vec3 color = vec3(f)+pow((fog.y+.1),4.)*32.*vec3(1.,0.4,0.1);
	// vec3 color = vec3(f)+pow((fog.y+.1),1.1)*vec3(1.,0.4,0.1);


	color+= fog.y*.27;

	
	vec3 horizon_blue = pow((-fog.y+1.5),1.)*vec3(0.2,0.5,1.0);
    vec3 horizon_orange = pow((fog.y),5.)*vec3(1.,0.4,0.1);

    vec3 horizon = mix(horizon_blue,horizon_orange,pow(1.2,3.));

	gl_FragColor = vec4( color, 1.0 );
}


