package personal.dashboard.services;

import lombok.Data;

@Data
public class WeatherData {
  private String city;
  private double temperature;
  private String description;
  private String icon;
  private String status;
}
