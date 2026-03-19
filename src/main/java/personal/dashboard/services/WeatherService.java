package personal.dashboard.services;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class WeatherService {

  @Value("${weather.api.key}")
  private String apiKey;
  private final String city = "nantes,fr";
  private final RestTemplate restTemplate = new RestTemplate();

  //getLiveWeather fonction de récupération de la météo sur openweathermap.org
  public WeatherData getLiveWeather() {
    String url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey
        + "&units=metric&lang=fr";

    try {
      Map<String, Object> response = restTemplate.getForObject(url, Map.class); 

      System.out.println("response : " + response);
      if (response == null) return getFallbackData("Erreur API");

      WeatherData data = new WeatherData();
        
      // Extraction du nom de la ville
      data.setCity((String) response.get("name"));

      // Extraction de la température (dans l'objet "main")
      Map<String, Object> main = (Map<String, Object>) response.get("main");
      if (main != null) {
          data.setTemperature(Double.parseDouble(main.get("temp").toString()));
      }

      // Extraction de la description (dans le premier élément de la liste "weather")
      List<Map<String, Object>> weatherList = (List<Map<String, Object>>) response.get("weather");
      if (weatherList != null && !weatherList.isEmpty()) {
          Map<String, Object> weatherEntry = weatherList.get(0);
          data.setDescription((String) weatherEntry.get("description"));
          data.setIcon((String) weatherEntry.get("icon"));
      }

      return data;

    } catch (Exception e) {
      System.err.println("Erreur lors de la récupération de la météo: " + e.getMessage());
      return getFallbackData("Erreur de récupération"); // En cas d'erreur API
    }
  }

  // Méthode de secours pour éviter le crash
  private WeatherData getFallbackData(String msg) {
    WeatherData d = new WeatherData();
    d.setCity(msg);
    d.setTemperature(0);
    d.setDescription("-");
    d.setIcon("01d");
    return d;
  }

}
