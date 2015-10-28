varying vec2 st;
uniform vec2 u_resolution;
uniform float u_time;

void main ()
{
	// float fade_out = 1.-abs(sin(u_time)-cos(u_time));
	float fade_out = 1.-mod(u_time*2., 2.);	// SAW TOOTH FUNCTION

	float border = abs(sin(fade_out/3.)); // 0.01
	float circle_radius= 1.-(fade_out); // 0.5
	
	vec4 circle_color= vec4(1.0, 1.0, 1.0, fade_out);
	

	// // vec2 st = gl_FragCoord.xy/u_resolution.xy;
  
	vec4 bkg_color = vec4(0.);
 
	// // Offset st with the center of the circle.
	vec2 xy = st;
	xy-= .5;
  
	// // float dixy =  sqrt(dot(xy/.2, circle_center*2.)); //????
	// // float dixy =  sqrt(xy.x*xy.x+xy.y*xy.y); //r^2 = x^2 + y^2 // Equation of circle
	float dist =  sqrt(dot(xy/.2, xy/.2)); //Equation of circle using dot product
 
	float t = 1.0 + smoothstep(circle_radius, circle_radius+border, dist) 
                - smoothstep(circle_radius-border, circle_radius, dist);
 
	gl_FragColor = mix(circle_color, bkg_color,t);

	// // gl_FragColor=vec4(1.0);	
}
