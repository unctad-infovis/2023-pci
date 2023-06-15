import React, { useEffect, useCallback, useRef } from 'react';
import PropTypes from 'prop-types';

// https://www.highcharts.com/
import Highcharts from 'highcharts';
import highchartsAccessibility from 'highcharts/modules/accessibility';
import highchartsExporting from 'highcharts/modules/exporting';
import highchartsExportData from 'highcharts/modules/export-data';

// https://www.npmjs.com/package/react-is-visible
import 'intersection-observer';
import { useIsVisible } from 'react-is-visible';

// import roundNr from '../helpers/RoundNr.js';

highchartsAccessibility(Highcharts);
highchartsExporting(Highcharts);
highchartsExportData(Highcharts);

Highcharts.setOptions({
  lang: {
    decimalPoint: '.',
    downloadCSV: 'Download CSV data',
    thousandsSep: ','
  }
});
Highcharts.SVGRenderer.prototype.symbols.download = (x, y, w, h) => {
  const path = [
    // Arrow stem
    'M', x + w * 0.5, y,
    'L', x + w * 0.5, y + h * 0.7,
    // Arrow head
    'M', x + w * 0.3, y + h * 0.5,
    'L', x + w * 0.5, y + h * 0.7,
    'L', x + w * 0.7, y + h * 0.5,
    // Box
    'M', x, y + h * 0.9,
    'L', x, y + h,
    'L', x + w, y + h,
    'L', x + w, y + h * 0.9
  ];
  return path;
};

function ScatterplotChart({
  data, idx, note, source, subtitle, title
}) {
  const chartRef = useRef();
  const isVisible = useIsVisible(chartRef, { once: true });
  const chartHeight = 700;
  const createChart = useCallback(() => {
    Highcharts.chart(`chartIdx${idx}`, {
      caption: {
        align: 'left',
        margin: 15,
        style: {
          color: 'rgba(0, 0, 0, 0.8)',
          fontFamily: 'Roboto',
          fontSize: '14px'
        },
        text: `${source} ${note ? (`<br /><span>${note}</span>`) : ''}`,
        useHTML: true,
        verticalAlign: 'bottom',
        x: 0
      },
      chart: {
        events: {
          load() {
            // eslint-disable-next-line react/no-this-in-sfc
            this.renderer.image('https://storage.unctad.org/2023-tdr_report_update/assets/img/unctad_logo.svg', 5, 15, 80, 100).add();
          }
        },
        height: chartHeight,
        resetZoomButton: {
          theme: {
            fill: '#fff',
            r: 0,
            states: {
              hover: {
                fill: '#0077b8',
                stroke: 'transparent',
                style: {
                  color: '#fff',
                  fontFamily: 'Roboto',
                }
              }
            },
            stroke: '#7c7067',
            style: {
              fontFamily: 'Roboto',
              fontSize: '13px',
              fontWeight: 400
            }
          }
        },
        style: {
          color: 'rgba(0, 0, 0, 0.8)',
          fontFamily: 'Roboto',
          fontWeight: 400
        },
        type: 'scatter',
        zoomType: 'xy'
      },
      colors: ['#009edb', '#004987', '#72bf44', '#f58220', '#eb1847', '#a05fb4'],
      credits: {
        enabled: false
      },
      exporting: {
        buttons: {
          contextButton: {
            menuItems: ['viewFullscreen', 'separator', 'downloadPNG', 'downloadPDF', 'separator', 'downloadCSV'],
            symbol: 'download',
            symbolFill: '#000'
          }
        },
        enabled: true,
        filename: '2023-unctad'
      },
      legend: {
        align: 'right',
        enabled: (data.length > 1),
        itemDistance: 20,
        itemStyle: {
          color: '#000',
          cursor: 'default',
          fontFamily: 'Roboto',
          fontSize: '14px',
          fontWeight: 400
        },
        layout: 'horizontal',
        verticalAlign: 'top'
      },
      plotOptions: {
        scatter: {
          marker: {
            radius: 3,
            symbol: 'circle',
            states: {
              hover: {
                enabled: true,
                lineColor: 'rgb(100,100,100)'
              }
            }
          },
          states: {
            hover: {
              marker: {
                enabled: false
              }
            }
          },
          jitter: {
            x: 0.005
          }
        }
      },
      responsive: {
        rules: [{
          chartOptions: {
            title: {
              margin: 20
            }
          },
          condition: {
            maxWidth: 630
          }
        }, {
          chartOptions: {
            chart: {
              height: 700
            },
            legend: {
              layout: 'horizontal'
            },
            title: {
              margin: 10,
              style: {
                fontSize: '26px',
                lineHeight: '30px'
              }
            },
            yAxis: [{
              title: {
                text: null
              }
            }, {
              title: {
                text: null
              }
            }]
          },
          condition: {
            maxWidth: 450
          }
        }, {
          chartOptions: {
            chart: {
              height: 800
            }
          },
          condition: {
            maxWidth: 400
          }
        }]
      },
      series: data,
      subtitle: {
        align: 'left',
        enabled: true,
        style: {
          color: 'rgba(0, 0, 0, 0.8)',
          fontSize: '16px',
          fontWeight: 400,
          lineHeight: '18px'
        },
        text: subtitle,
        widthAdjust: -100,
        x: 100
      },
      title: {
        align: 'left',
        margin: 40,
        style: {
          color: '#000',
          fontSize: '30px',
          fontWeight: 700,
          lineHeight: '34px'
        },
        text: title,
        widthAdjust: -160,
        x: 100
      },
      tooltip: {
        borderRadius: 0,
        borderWidth: 0,
        crosshairs: true,
        formatter() {
          // eslint-disable-next-line react/no-this-in-sfc
          return `<div class="tooltip_container"><h3 class="tooltip_header">${this.key}</h3><div class="tooltip_row"><span class="tooltip_label">2022:</span> <span class="tooltip_value">${this.y.toFixed(2)}</span></div><div class="tooltip_row"><span class="tooltip_label">2018:</span> <span class="tooltip_value">${this.x.toFixed(2)}</span></div></div>`;
        },
        padding: 0,
        shadow: false,
        shared: true,
        useHTML: true
      },
      xAxis: {
        allowDecimals: false,
        gridLineColor: 'rgba(124, 112, 103, 0.2)',
        gridLineDashStyle: 'shortdot',
        gridLineWidth: 1,
        labels: {
          reserveSpace: true,
          style: {
            color: '#000',
            fontFamily: 'Roboto',
            fontSize: '16px',
            fontWeight: 400
          }
        },
        lineColor: 'transparent',
        lineWidth: 0,
        max: 75,
        min: 15,
        opposite: false,
        showLastLabel: true,
        tickInterval: 10,
        title: {
          enabled: true,
          reserveSpace: true,
          style: {
            color: '#000',
            fontFamily: 'Roboto',
            fontSize: '16px',
            fontWeight: 400
          },
          text: 'PCI 2018'
        },
        type: 'linear'
      },
      yAxis: {
        allowDecimals: false,
        gridLineColor: 'rgba(124, 112, 103, 0.2)',
        gridLineDashStyle: 'shortdot',
        gridLineWidth: 1,
        labels: {
          reserveSpace: true,
          style: {
            color: '#000',
            fontFamily: 'Roboto',
            fontSize: '16px',
            fontWeight: 400
          }
        },
        lineColor: 'transparent',
        lineWidth: 0,
        max: 75,
        min: 15,
        opposite: false,
        showLastLabel: true,
        tickInterval: 10,
        title: {
          enabled: true,
          reserveSpace: true,
          style: {
            color: '#000',
            fontFamily: 'Roboto',
            fontSize: '16px',
            fontWeight: 400
          },
          text: 'PCI 2022'
        },
        type: 'linear'
      }
    });
    chartRef.current.querySelector(`#chartIdx${idx}`).style.opacity = 1;
  }, [data, idx, note, source, subtitle, title]);

  useEffect(() => {
    if (isVisible === true) {
      setTimeout(() => {
        createChart();
      }, 300);
    }
  }, [createChart, isVisible]);

  return (
    <div className="chart_container">
      <div ref={chartRef}>
        {(isVisible) && (<div className="chart" id={`chartIdx${idx}`} />)}
      </div>
      <noscript>Your browser does not support JavaScript!</noscript>
    </div>
  );
}

ScatterplotChart.propTypes = {
  data: PropTypes.instanceOf(Array).isRequired,
  idx: PropTypes.string.isRequired,
  note: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  source: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  title: PropTypes.string.isRequired,
};

ScatterplotChart.defaultProps = {
  note: false,
  subtitle: false
};

export default ScatterplotChart;
