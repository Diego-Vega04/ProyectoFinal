package com.grupo1.backend;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer{

    //clase de configuracion para que la api y el proyecto de angular se puedan comunicar

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**") //rutas a las que afecta esta configuracion (todas)
                .allowedOrigins("http://localhost:4200") //url del proyecto de angular
                .allowedMethods("GET", "POST", "PUT", "DELETE") //metodos permitidos
                .allowedHeaders("*")
                .allowCredentials(true);
    }
}
