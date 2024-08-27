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
      },

      getMinWindSpeed(station) {
        if (station.reports.length === 0) {
          return null; 
        }
        
        let minWindSpeedReport = station.reports[0];
        station.reports.forEach(report => {
          if (report.windSpeed < minWindSpeedReport.windSpeed) {
            minWindSpeedReport = report;
          }
        });
        
        return minWindSpeedReport.windSpeed;
      },
    
      getMaxWindSpeed(station) {
        if (station.reports.length === 0) {
          return null;
        }
        
        let maxWindSpeedReport = station.reports[0];
        station.reports.forEach(report => {
          if (report.windSpeed > maxWindSpeedReport.windSpeed) {
            maxWindSpeedReport = report;
          }
        });
        
        return maxWindSpeedReport.windSpeed;
      },
    
      getMinPressure(station) {
        if (station.reports.length === 0) {
          return null; 
        }
        
        let minPressureReport = station.reports[0];
        station.reports.forEach(report => {
          if (report.pressure < minPressureReport.pressure) {
            minPressureReport = report;
          }
        });
        
        return minPressureReport.pressure;
      },
    
      getMaxPressure(station) {
        if (station.reports.length === 0) {
          return null;
        }
        
        let maxPressureReport = station.reports[0];
        station.reports.forEach(report => {
          if (report.pressure > maxPressureReport.pressure) {
            maxPressureReport = report;
          }
        });
        
        return maxPressureReport.pressure;
      },


    }