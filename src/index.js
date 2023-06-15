import React from 'react';

import { createRoot } from 'react-dom/client';

import Figure2 from './jsx/Figure2.jsx';

const containerFigure2 = document.getElementById('app-root-2023-pci-figure2');
const rootFigure2 = createRoot(containerFigure2);
rootFigure2.render(<Figure2 />);
