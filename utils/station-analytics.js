export const stationAnalytics = {
    getMinTemperature(station) {
        if (station.reports.length === 0) {
          return null; 
        }
        
        let minTemperatureReport = station.reports[0];
        station.reports.forEach(report => {
          if (report.temperature < minTemperatureReport.temperature) {
            minTemperatureReport = report;
          }
        });
        
        return minTemperatureReport.temperature;
      },

    getMaxTemperature(station) {
        if (station.reports.length === 0) {
            return null;
        }
        
        let maxTemperatureReport = station.reports[0];
        station.reports.forEach(report => {
          if (report.temperature > maxTemperatureReport.temperature) {
            maxTemperatureReport = report;
          }
        });
        
        return maxTemperatureReport.temperature;
      },

      getMostRecentReport(station) {
        if (station.reports.length === 0) {
            return null;}
    
        let mostRecentReport = station.reports[station.reports.length - 1];
        return mostRecentReport;
      }
    }