package personal.dashboard.services;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/dashboard")
public class DashboardController {
  // Permet de configurer le titre du dashboard via application.properties
  @org.springframework.beans.factory.annotation.Value("${dashboard.title:Personal Dashboard}")
  private String dashboardTitle;

  private final MonitoringService monitoringService;
  private final WeatherService weatherService; 

  public DashboardController(MonitoringService monitoringService, WeatherService weatherService) {
    this.monitoringService = monitoringService;
    this.weatherService = weatherService;
  }

  @GetMapping("/server-time")
  public Map<String, String> getServerTime() {
    DateTimeFormatter formatter = DateTimeFormatter.ofPattern("HH:mm:ss");
    String time = LocalDateTime.now().format(formatter);

    return Collections.singletonMap("time", time);
  } 

  @GetMapping("/widgets") // acces via GET /api/dashboard/widgets
  public List<WidgetData> getWidgets() {
    double cpu = monitoringService.getCpuUsage();
    String status = cpu > 80 ? "error" : (cpu > 50 ? "warning" : "success");
    WeatherData weatherData = weatherService.getLiveWeather();

    return Arrays.asList(
        new WidgetData("CPU Usage", cpu + "%", status, null,8),
        new WidgetData("Weather - " + weatherData.getCity(),
            weatherData.getTemperature() + "°C, " + weatherData.getDescription(), "info", weatherData.getIcon(),4)
      );
  }
}
