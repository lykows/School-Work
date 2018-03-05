//a white ceramic appearance shader

varying vec3 normal; 
varying vec3 lightVec; 
varying vec3 viewVec; 

void main(){ 
	vec3 norm = normalize(normal); 
	vec3 L = normalize(lightVec); 
	vec3 V = normalize(viewVec); 
	vec3 halfAngle = normalize(L + V); 
	vec4 final_color = (gl_FrontLightModelProduct.sceneColor *gl_FrontMaterial.ambient)+ 
						 (gl_LightSource[0].ambient * gl_FrontMaterial.ambient);
	float NdotL = dot(norm, L);
	float NdotH = clamp(dot(halfAngle, norm), 0.0, 1.0); 
	if (NdotL > 0.0){
		final_color += gl_LightSource[0].diffuse *
						 gl_FrontMaterial.diffuse *
						 NdotL;
		vec3 R = reflect(-L, norm);
		float specular = pow(NdotH,gl_FrontMaterial.shininess); 		
		final_color += gl_LightSource[0].specular * gl_FrontMaterial.specular * specular;

	}
	gl_FragColor = final_color;
}