//a white ceramic appearance shader

varying vec3 normal; 
varying vec3 lightVec; 
varying vec3 viewVec; 

void main(){ 
	
	vec4 vert = gl_ModelViewMatrix * gl_Vertex; 
	normal = gl_NormalMatrix * gl_Normal; 
	lightVec = vec3(gl_LightSource[0].position - vert); 
	viewVec = -vec3(vert); 
	gl_Position = ftransform(); 
}