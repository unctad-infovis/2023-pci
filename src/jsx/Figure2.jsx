import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

// Load helpers.
import CSVtoJSON from './helpers/CSVtoJSON.js';
import ChartLine from './components/ChartLine.jsx';

import '../styles/styles.less';

function Figure2({ lang }) {
  // Data states.
  const [dataFigure, setDataFigure] = useState(false);

  const cleanData = (data) => data.map((el) => {
    const labels = Object.keys(el).filter(val => val !== 'Name').map(val => Date.UTC(parseInt(val, 10), 0, 1));
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
      name: el.Name,
      yAxis: 0
    });
  });

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
  }, [lang]);

  return (
    <div className="app">
      {dataFigure && (
      <ChartLine
        data={dataFigure}
        idx="2"
        lang={lang}
        note={lang === 'fr' ? '<em>Note:</em> ' : (lang === 'es' ? '<em>Nota:</em> ' : '<em>Note:</em> ')}
        show_first_label
        source={lang === 'fr' ? '<em>Source:</em> ' : (lang === 'es' ? '<em>Fuente:</em> ' : '<em>Source:</em> UNCTAD')}
        subtitle={lang === 'fr' ? '' : (lang === 'es' ? '' : 'Average scores on the composite index, 2000–2022')}
        title={lang === 'fr' ? '' : (lang === 'es' ? '' : 'Countries with policies based on the productive capacities index have made notable progress')}
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
