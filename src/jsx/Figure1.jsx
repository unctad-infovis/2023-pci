import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

// Load helpers.
import CSVtoJSON from './helpers/CSVtoJSON.js';
import ChartScatterplot from './components/ChartScatterplot.jsx';

import '../styles/styles.less';

function Figure2({ lang }) {
  // Data states.
  const [dataFigure, setDataFigure] = useState(false);

  const cleanData = (data) => ([{
    color: 'rgba(170, 160, 150, 0.8)',
    data: [[0, 0], [80, 80]],
    id: '',
    lineWidth: 2,
    name: '',
    showInLegend: false,
    type: 'line'
  }, {
    data: data.filter(el => el.Continent === 'Africa').map(el => ({ x: parseFloat(el[2018]), y: parseFloat(el[2022]), name: el.Name })),
    id: 'Africa',
    marker: { symbol: 'circle' },
    name: 'Africa'
  }, {
    data: data.filter(el => el.Continent === 'Asia').map(el => ({ x: parseFloat(el[2018]), y: parseFloat(el[2022]), name: el.Name })),
    id: 'Asia',
    marker: { symbol: 'circle' },
    name: 'Asia'
  }, {
    data: data.filter(el => el.Continent === 'Europe').map(el => ({ x: parseFloat(el[2018]), y: parseFloat(el[2022]), name: el.Name })),
    id: 'Europe',
    marker: { symbol: 'circle' },
    name: 'Europe'
  }, {
    data: data.filter(el => el.Continent === 'North America').map(el => ({ x: parseFloat(el[2018]), y: parseFloat(el[2022]), name: el.Name })),
    id: 'North America',
    marker: { symbol: 'circle' },
    name: 'North America'
  }, {
    data: data.filter(el => el.Continent === 'Oceania').map(el => ({ x: parseFloat(el[2018]), y: parseFloat(el[2022]), name: el.Name })),
    id: 'Oceania',
    marker: { symbol: 'circle' },
    name: 'Oceania'
  }, {
    data: data.filter(el => el.Continent === 'South America').map(el => ({ x: parseFloat(el[2018]), y: parseFloat(el[2022]), name: el.Name })),
    id: 'South America',
    marker: { symbol: 'circle' },
    name: 'South America'
  }]);

  useEffect(() => {
    const data_file = `${(window.location.href.includes('unctad.org')) ? 'https://storage.unctad.org/2023-pci/' : './'}assets/data/2023-pci_figure1_${lang}.csv`;
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
  }, [lang]);

  return (
    <div className="app">
      {dataFigure && (
      <ChartScatterplot
        data={dataFigure}
        idx="1"
        lang={lang}
        note={lang === 'fr' ? '<em>Note:</em> ' : (lang === 'es' ? '<em>Nota:</em> ' : '<em>Note:</em> ')}
        show_first_label
        source={lang === 'fr' ? '<em>Source:</em> ' : (lang === 'es' ? '<em>Fuente:</em> ' : '<em>Source:</em> UNCTAD')}
        subtitle={lang === 'fr' ? '' : (lang === 'es' ? '' : 'PCI 2018 versus PCI 2022')}
        title={lang === 'fr' ? '' : (lang === 'es' ? '' : 'Covid-19 hit PCI index in all regions but there are success stories')}
        xlabel={lang === 'fr' ? '' : (lang === 'es' ? '' : '')}
        ylabel=""
      />
      )}
      <noscript>Your browser does not support JavaScript!</noscript>
    </div>
  );
}

Figure2.propTypes = {
  lang: PropTypes.string
};

Figure2.defaultProps = {
  lang: 'en'
};

export default Figure2;
