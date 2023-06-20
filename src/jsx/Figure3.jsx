import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';

// Load helpers.
import CSVtoJSON from './helpers/CSVtoJSON.js';
import ChartScatterplot from './components/ChartScatterplot.jsx';

import '../styles/styles.less';

function Figure3({ lang }) {
  // Data states.
  const [dataFigure, setDataFigure] = useState(false);

  const cleanData = useCallback((data) => ([{
    data: data.filter(el => el.Group === 'Developed economies').map(el => ({ x: parseFloat(el['Log GDP per capita']), y: parseFloat(el.PCI), name: el.Name })),
    id: 'Developed economies',
    marker: { symbol: 'circle' },
    name: 'Developed economies'
  }, {
    data: data.filter(el => el.Group === 'LDCs').map(el => ({ x: parseFloat(el['Log GDP per capita']), y: parseFloat(el.PCI), name: el.Name })),
    id: 'LDCs',
    marker: { symbol: 'circle' },
    name: 'LDCs'
  }, {
    data: data.filter(el => el.Group === 'LLDCs (other than LDCs)').map(el => ({ x: parseFloat(el['Log GDP per capita']), y: parseFloat(el.PCI), name: el.Name })),
    id: 'LLDCs (other than LDCs)',
    marker: { symbol: 'circle' },
    name: 'LLDCs (other than LDCs)'
  }, {
    data: data.filter(el => el.Group === 'Other developing economies').map(el => ({ x: parseFloat(el['Log GDP per capita']), y: parseFloat(el.PCI), name: el.Name })),
    id: 'Other developing economies',
    marker: { symbol: 'circle' },
    name: 'Other developing economies'
  }]), []);

  useEffect(() => {
    const data_file = `${(window.location.href.includes('unctad.org')) ? 'https://storage.unctad.org/2023-pci/' : './'}assets/data/2023-pci_figure3.csv`;
    try {
      fetch(data_file)
        .then((response) => {
          if (!response.ok) {
            throw Error(response.statusText);
          }
          return response.text();
        })
        .then(body => setDataFigure(cleanData(CSVtoJSON(body))));
    } catch (error) {
      console.error(error);
    }
  }, [cleanData, lang]);

  return (
    <div className="app">
      {dataFigure && (
      <ChartScatterplot
        data={dataFigure}
        idx="3"
        lang={lang}
        note="LDCs = Least developed countries, LLDC = Landlocked Developing Countries"
        show_first_label
        source="<em>Source:</em> UNCTADStat, 2023."
        subtitle="Correlation, p = 0.90"
        title="Correlation between the Productive Capacities Index and Gross Domestic Product per Capita, 2021"
        xlabel="Log GDP per capita"
        xmax={5.2}
        xmin={2.4}
        xtickInterval={0.2}
        ylabel="Productive Capacities Index"
        ymax={80}
        ymin={0}
      />
      )}
      <noscript>Your browser does not support JavaScript!</noscript>
    </div>
  );
}

Figure3.propTypes = {
  lang: PropTypes.string
};

Figure3.defaultProps = {
  lang: 'en'
};

export default Figure3;
