package personal.dashboard.test;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data // Génère les getters, setters, toString, equals et hashCode
@AllArgsConstructor // Génère un constructeur
public class WidgetData {
  private String title;
  private String content;
  private String status; // ex: "OK", "WARNING", "ERROR"
}
