package personal.dashboard.services;

import org.apache.commons.logging.Log;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.time.LocalTime;
import java.time.temporal.ChronoUnit;
import java.util.Arrays;
import java.util.List;

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

  @GetMapping("/widgets") // acces via GET /api/dashboard/widgets
  public List<WidgetData> getWidgets() {
    double cpu = monitoringService.getCpuUsage();
    String status = cpu > 80 ? "error" : (cpu > 50 ? "warning" : "success");
    WeatherData weatherData = weatherService.getLiveWeather();

    return Arrays.asList(
        new WidgetData("Time", LocalTime.now().truncatedTo(ChronoUnit.SECONDS).toString(), "info"),
        new WidgetData("CPU Usage", cpu + "%", status),
        new WidgetData("Weather - " + weatherData.getCity(),
            weatherData.getTemperature() + "°C, " + weatherData.getDescription(), "info"));
  }
}
