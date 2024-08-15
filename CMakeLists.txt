# Builds the imgui library with the GLFW and Vulkan backends

cmake_minimum_required(VERSION 3.28)

project(imgui)

add_library(imgui STATIC)

target_sources(imgui PRIVATE
    "imgui.cpp"
    "imgui_demo.cpp"
    "imgui_draw.cpp"
    "imgui_tables.cpp"
    "imgui_widgets.cpp"
    "backends/imgui_impl_glfw.cpp"
    "backends/imgui_impl_vulkan.cpp"
    "misc/cpp/imgui_stdlib.cpp"
)

target_include_directories(imgui PUBLIC 
    "${CMAKE_CURRENT_SOURCE_DIR}"
    "${CMAKE_CURRENT_SOURCE_DIR}/backends"
    "${CMAKE_CURRENT_SOURCE_DIR}/misc/cpp"    
)

# Link against the external libraries required by the backends
# Note: The glfw and Vulkan::Vulkan targets must be defined in the parent project or globally.
# Ensure that glfw and Vulkan are found via find_package() or add_subdirectory() in the parent project.
target_link_libraries(imgui PUBLIC 
    glfw
    Vulkan::Vulkan 
)
