
void main() {
    vec2 pos = gl_FragCoord.xy;
	gl_FragColor = vec4(pos.x,pos.y,0,1);
    
}
