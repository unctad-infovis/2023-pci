import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';

// Load helpers.
import CSVtoJSON from './helpers/CSVtoJSON.js';
import ChartLine from './components/ChartLine.jsx';

import '../styles/styles.less';

function Figure2({ lang }) {
  // Data states.
  const [dataFigure, setDataFigure] = useState(false);

  const cleanData = useCallback((data) => data.map((el) => {
    const labels = Object.keys(el).filter(val => val !== `Name ${lang}`).map(val => Date.UTC(parseInt(val, 10), 0, 1));
    const values = Object.values(el).map(val => (parseFloat(val))).filter(val => !Number.isNaN(val));

    return ({
      data: values.map((e, j) => ({
        x: labels[j],
        y: e
      })),
      label: {
        enabled: false
      },
      lineWidth: 3,
      name: el[`Name ${lang}`],
      yAxis: 0
    });
  }), [lang]);

  useEffect(() => {
    const data_file = `${(window.location.href.includes('unctad.org')) ? 'https://storage.unctad.org/2023-pci/' : './'}assets/data/2023-pci_figure2_${lang}.csv`;
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
      <ChartLine
        data={dataFigure}
        idx="2"
        lang={lang}
        note={false}
        show_first_label
        source={lang === 'fr' ? '<em>Source:</em> CNUCED, d\'après UNCTADstat, 2023.' : (lang === 'es' ? '<em>Fuente:</em> UNCTAD con base en UNCTADstat, 2023.' : '<em>Source:</em> UNCTAD from UNCTADstat, 2023.')}
        subtitle={lang === 'fr' ? 'Score global de l\'indice composite, 2000–2022' : (lang === 'es' ? 'Puntuación global en el índice compuesto, 2000–2022' : 'Overall score on the composite index, 2000–2022')}
        title={lang === 'fr' ? 'Les pays dont les politiques sont basées sur l\'indice des capacités productives ont réalisé des progrès notables' : (lang === 'es' ? 'Los países con políticas basadas en el índice de capacidades productivas han logrado avances notables' : 'Countries with policies based on the productive capacities index have made notable progress')}
        xlabel=""
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
