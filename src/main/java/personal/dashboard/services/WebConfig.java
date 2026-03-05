package personal.dashboard.services;

import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig {

  @Bean
  public WebMvcConfigurer corsConfigurer() {
    return new WebMvcConfigurer() {
      @Override
      public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**") // Permet à toutes les routes d'accepter les requêtes CORS
            .allowedOrigins("http://localhost:5173") // Permet à toutes les origines d'accéder à l'API
            .allowedMethods("GET", "POST", "PUT", "DELETE"); // Permet les méthodes HTTP courantes
      }
    };
  }

}
