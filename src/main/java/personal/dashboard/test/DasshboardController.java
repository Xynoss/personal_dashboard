package personal.dashboard.test;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.time.LocalTime;
import java.util.Arrays;
import java.util.List;

@RestController
@RequestMapping("/api/dashboard")
public class DasshboardController {

  @org.springframework.beans.factory.annotation.Value("${dashboard.title:Personal Dashboard}") // Permet de configurer
                                                                                               // le
                                                                                               // titre du dashboard via
                                                                                               // application.properties
  private String dashboardTitle;

  @GetMapping("/widgets") // acces via GET /api/dashboard/widgets
  public List<WidgetData> getWidgets() {
    return Arrays.asList(
        new WidgetData("Server Java", "Online", "success"),
        new WidgetData("Time", LocalTime.now().toString(), "info"),
        new WidgetData("CPU Usage", "75%", "warning"));
  }
}
