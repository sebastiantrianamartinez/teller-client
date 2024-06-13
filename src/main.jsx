/* eslint-disable no-unused-vars */
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'
import { Writer } from './components/editor-tools/writer.jsx';

const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement);
root.render(<Writer />);
