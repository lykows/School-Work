//a white ceramic appearance shader

varying vec3 normal; 
varying vec3 lightVec; 
varying vec3 viewVec; 
vec4 final_color;

void main(){ 
	vec3 norm = normalize(normal); 
	vec3 L = normalize(lightVec); 
	vec3 V = normalize(viewVec); 
	vec3 halfAngle = normalize(L + V);
	float NdotL = dot(norm, L);
	float NdotH = clamp(dot(halfAngle, norm), 0.0, 1.0); 
	if (NdotL > 0.0){
		final_color += gl_LightSource[0].diffuse *
						 gl_FrontMaterial.diffuse *
						 NdotL;
		float specAngle = dot(halfAngle, norm);
		float specular = pow(specAngle, gl_FrontMaterial.shininess); 		
		final_color += gl_LightSource[0].specular * gl_FrontMaterial.specular * specular;

	}
	gl_FragColor = gl_FrontMaterial.ambient + NdotL * gl_FrontMaterial.diffuse + final_color;
}