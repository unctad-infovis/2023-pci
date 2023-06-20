import React from 'react';

import { createRoot } from 'react-dom/client';

import Figure1 from './jsx/Figure1.jsx';
import Figure2 from './jsx/Figure2.jsx';
import Figure3 from './jsx/Figure3.jsx';
import Figure4 from './jsx/Figure4.jsx';

let lang = 'en';
if (window.location.href.includes('/fr/')) {
  lang = 'fr';
}
if (window.location.href.includes('/es/')) {
  lang = 'es';
}

const containerFigure1 = document.getElementById('app-root-2023-pci-figure1');
if (containerFigure1) {
  const rootFigure1 = createRoot(containerFigure1);
  rootFigure1.render(<Figure1 lang={lang} />);
}

const containerFigure2 = document.getElementById('app-root-2023-pci-figure2');
if (containerFigure2) {
  const rootFigure2 = createRoot(containerFigure2);
  rootFigure2.render(<Figure2 lang={lang} />);
}

const containerFigure3 = document.getElementById('app-root-2023-pci-figure3');
if (containerFigure3) {
  const rootFigure3 = createRoot(containerFigure3);
  rootFigure3.render(<Figure3 />);
}

const containerFigure4 = document.getElementById('app-root-2023-pci-figure4');
if (containerFigure4) {
  const rootFigure4 = createRoot(containerFigure4);
  rootFigure4.render(<Figure4 />);
}
