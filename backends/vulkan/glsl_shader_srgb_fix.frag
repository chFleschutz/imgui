#version 450 core
layout(location = 0) out vec4 fColor;

layout(set=0, binding=0) uniform sampler2D sTexture;

layout(location = 0) in struct {
    vec4 Color;
    vec2 UV;
} In;

// Converts a color from sRGB to linear
vec3 toLinear(vec3 sRGB)
{
    // See https://gamedev.stackexchange.com/questions/92015/optimized-linear-to-srgb-glsl
    return mix(pow((sRGB + vec3(0.055))/vec3(1.055), vec3(2.4)), 
                sRGB/vec3(12.92), 
                lessThan(sRGB, vec3(0.04045)));
}

void main()
{
    fColor = In.Color * texture(sTexture, In.UV.st);
    fColor.rgb = toLinear(fColor.rgb);
}
