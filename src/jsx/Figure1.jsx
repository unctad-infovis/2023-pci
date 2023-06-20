import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';

// Load helpers.
import CSVtoJSON from './helpers/CSVtoJSON.js';
import ChartScatterplot from './components/ChartScatterplot.jsx';

import '../styles/styles.less';

function Figure1({ lang }) {
  // Data states.
  const [dataFigure, setDataFigure] = useState(false);

  const cleanData = useCallback((data) => ([{
    color: 'rgba(170, 160, 150, 0.6)',
    data: [[0, 0], [80, 80]],
    id: '',
    lineWidth: 1.5,
    name: '',
    showInLegend: false,
    type: 'line'
  }, {
    data: data.filter(el => el['Continent en'] === 'Africa').map(el => ({ x: parseFloat(el[2018]), y: parseFloat(el[2022]), name: el[`Name ${lang}`] })),
    id: 'Africa',
    marker: { symbol: 'circle' },
    name: lang === 'fr' ? 'Afrique' : lang === 'es' ? 'África' : 'Africa'
  }, {
    data: data.filter(el => el['Continent en'] === 'Asia').map(el => ({ x: parseFloat(el[2018]), y: parseFloat(el[2022]), name: el[`Name ${lang}`] })),
    id: 'Asia',
    marker: { symbol: 'circle' },
    name: lang === 'fr' ? 'Asie' : lang === 'es' ? 'Asia' : 'Asia'
  }, {
    data: data.filter(el => el['Continent en'] === 'Europe').map(el => ({ x: parseFloat(el[2018]), y: parseFloat(el[2022]), name: el[`Name ${lang}`] })),
    id: 'Europe',
    marker: { symbol: 'circle' },
    name: lang === 'fr' ? 'Europe' : lang === 'es' ? 'Europa' : 'Europe'
  }, {
    data: data.filter(el => el['Continent en'] === 'North America').map(el => ({ x: parseFloat(el[2018]), y: parseFloat(el[2022]), name: el[`Name ${lang}`] })),
    id: 'North America',
    marker: { symbol: 'circle' },
    name: lang === 'fr' ? 'Amérique du Nord' : lang === 'es' ? 'América del Norte' : 'North America'
  }, {
    data: data.filter(el => el['Continent en'] === 'Oceania').map(el => ({ x: parseFloat(el[2018]), y: parseFloat(el[2022]), name: el[`Name ${lang}`] })),
    id: 'Oceania',
    marker: { symbol: 'circle' },
    name: lang === 'fr' ? 'Océanie' : lang === 'es' ? 'Oceanía' : 'Oceania'
  }, {
    data: data.filter(el => el['Continent en'] === 'South America').map(el => ({ x: parseFloat(el[2018]), y: parseFloat(el[2022]), name: el[`Name ${lang}`] })),
    id: 'South America',
    marker: { symbol: 'circle' },
    name: lang === 'fr' ? 'Amérique du Sud' : lang === 'es' ? 'América del Sur' : 'South America'
  }]), [lang]);

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
  }, [cleanData, lang]);

  return (
    <div className="app">
      {dataFigure && (
      <ChartScatterplot
        data={dataFigure}
        idx="1"
        lang={lang}
        note={false}
        show_first_label
        source={lang === 'fr' ? '<em>Source:</em> CNUCED, d\'après UNCTADStat, 2023.' : (lang === 'es' ? '<em>Fuente:</em> UNCTAD con base en UNCTADStat, 2023.' : '<em>Source:</em> UNCTAD from UNCTADStat, 2023.')}
        subtitle={lang === 'fr' ? 'Scores moyens de l\'indice composite en 2022 par rapport à 2018' : (lang === 'es' ? 'Puntuaciones medias del índice compuesto en 2022 frente a 2018' : 'Overall score on the composite index in 2022 vs 2018')}
        title={lang === 'fr' ? 'Le COVID-19 a affecté les capacités productives au niveau mondial, mais certaines régions ont fait preuve de résilience' : (lang === 'es' ? 'La COVID-19 afectó a las capacidades productivas a nivel mundial, pero algunas regiones mostraron resiliencia' : 'COVID-19 hit productive capacities globally but some regions showed resilience')}
        xlabel="PCI 2018"
        xmax={75}
        xmin={15}
        ylabel="PCI 2022"
        ymax={75}
        ymin={15}
      />
      )}
      <noscript>Your browser does not support JavaScript!</noscript>
    </div>
  );
}

Figure1.propTypes = {
  lang: PropTypes.string
};

Figure1.defaultProps = {
  lang: 'en'
};

export default Figure1;
