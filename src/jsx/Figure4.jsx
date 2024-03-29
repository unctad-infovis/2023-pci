import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';

// Load helpers.
import CSVtoJSON from './helpers/CSVtoJSON.js';
import ChartScatterplot from './components/ChartScatterplot.jsx';

import '../styles/styles.less';

function Figure4({ lang }) {
  // Data states.
  const [dataFigure, setDataFigure] = useState(false);

  const cleanData = useCallback((data) => ([{
    data: data.filter(el => el.Group === 'Developed economies').map(el => ({ x: parseFloat(el['Merchandise Export Concentration Index']), y: parseFloat(el.PCI), name: el.Name })),
    id: 'Developed economies',
    marker: { symbol: 'circle' },
    name: 'Developed economies'
  }, {
    data: data.filter(el => el.Group === 'LDCs').map(el => ({ x: parseFloat(el['Merchandise Export Concentration Index']), y: parseFloat(el.PCI), name: el.Name })),
    id: 'LDCs',
    marker: { symbol: 'circle' },
    name: 'LDCs'
  }, {
    data: data.filter(el => el.Group === 'LLDCs (other than LDCs)').map(el => ({ x: parseFloat(el['Merchandise Export Concentration Index']), y: parseFloat(el.PCI), name: el.Name })),
    id: 'LLDCs (other than LDCs)',
    marker: { symbol: 'circle' },
    name: 'LLDCs (other than LDCs)'
  }, {
    data: data.filter(el => el.Group === 'Other developing economies').map(el => ({ x: parseFloat(el['Merchandise Export Concentration Index']), y: parseFloat(el.PCI), name: el.Name })),
    id: 'Other developing economies',
    marker: { symbol: 'circle' },
    name: 'Other developing economies'
  }]), []);

  useEffect(() => {
    const data_file = `${(window.location.href.includes('unctad.org')) ? 'https://storage.unctad.org/2023-pci/' : './'}assets/data/2023-pci_figure4.csv`;
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
        idx="4"
        lang={lang}
        note="LDCs = Least Developed Countries, LLDCs = Landlocked Developing Countries"
        show_first_label
        source="<em>Source:</em> UNCTAD from UNCTADstat, 2023."
        subtitle="Correlation, p = -0.49"
        title="Correlation between the productive capacities index and the merchandise export concentration index, 2021"
        xlabel="Merchandise Export Concentration Index"
        xmax={1}
        xmin={0}
        xtickInterval={0.1}
        ylabel="Productive Capacities Index"
        ymax={80}
        ymin={0}
      />
      )}
      <noscript>Your browser does not support JavaScript!</noscript>
    </div>
  );
}

Figure4.propTypes = {
  lang: PropTypes.string
};

Figure4.defaultProps = {
  lang: 'en'
};

export default Figure4;
