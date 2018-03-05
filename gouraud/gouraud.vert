const vec4 lightPosWorld = vec4(4.0, 4.0, 4.0, 1.0);

varying float specular_intensity;
varying float diffuse_intensity;

void main(void){
	vec4 verPosCam = gl_ModelViewMatrix * gl_Vertex;
	vec3 nCam = normalize(gl_NormalMatrix * gl_Normal);
	vec4 lightPosCam = gl_ModelViewMatrix * lightPosWorld;

	vec3 lightVert = normalize(vec3(lightPosCam - verPosCam));
	vec3 lightRefl = normalize(reflect(lightVert, nCam));
	
	diffuse_intensity = max(dot(lightVert, nCam), 0.0);

	specular_intensity = max(dot(lightRefl, normalize(vec3(verPosCam))), 0.0);
	specular_intensity = pow(specular_intensity, 6.0);

	gl_Position = gl_ModelViewProjectionMatrix * gl_Vertex; 
}