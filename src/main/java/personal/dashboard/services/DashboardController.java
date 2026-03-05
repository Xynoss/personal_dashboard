package personal.dashboard.services;

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

  public DashboardController(MonitoringService monitoringService) {
    this.monitoringService = monitoringService;
  }

  @GetMapping("/widgets") // acces via GET /api/dashboard/widgets
  public List<WidgetData> getWidgets() {
    double cpu = monitoringService.getCpuUsage();
    String status = cpu > 80 ? "error" : (cpu > 50 ? "warning" : "success");
    return Arrays.asList(
        new WidgetData("Server Java", "Online", "success"),
        new WidgetData("Time", LocalTime.now().truncatedTo(ChronoUnit.SECONDS).toString(), "info"),
        new WidgetData("CPU Usage", cpu + "%", status));
  }
}
