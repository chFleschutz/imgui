# Builds the imgui library with the GLFW and Vulkan backends

cmake_minimum_required(VERSION 3.28)

project(imgui)

add_library(imgui STATIC)
add_library(imgui::imgui ALIAS imgui)

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

target_link_libraries(imgui PUBLIC glfw)

option(IMGUI_USE_VOLK "Use Volk instead of linking against Vulkan loader" OFF)
if(IMGUI_USE_VOLK)
    message(STATUS "ImGui: building with Volk backend")
    target_link_libraries(imgui PUBLIC volk::volk_headers)
    target_compile_definitions(imgui PRIVATE
        IMGUI_IMPL_VULKAN_USE_VOLK
        IMGUI_IMPL_VULKAN_NO_PROTOTYPES
    )
else()
    message(STATUS "ImGui: building with standard Vulkan loader")
    target_link_libraries(imgui PUBLIC Vulkan::Vulkan)
endif()
