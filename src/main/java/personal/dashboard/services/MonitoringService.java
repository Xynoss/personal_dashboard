package personal.dashboard.services;

import org.springframework.stereotype.Service;
import oshi.SystemInfo;
import oshi.hardware.CentralProcessor;

@Service
public class MonitoringService {
  private final SystemInfo si = new SystemInfo();
  private final CentralProcessor processor = si.getHardware().getProcessor();
  private long[] prevTicks = new long[CentralProcessor.TickType.values().length];

  public double getCpuUsage() {
    double load = processor.getSystemCpuLoadBetweenTicks(prevTicks) * 100;
    prevTicks = processor.getSystemCpuLoadTicks();
    return Math.round(load * 10.0) / 10.0; // Arrondi à une décimale
  }
}
