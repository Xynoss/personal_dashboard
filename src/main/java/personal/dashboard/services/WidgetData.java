package personal.dashboard.services;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data // Génère les getters, setters, toString, equals et hashCode
@AllArgsConstructor // Génère un constructeur
public class WidgetData {
  private String title;
  private String content;
  private String status; // ex: "OK", "WARNING", "ERROR"
  private String icon;
  private int gridSize;
}
