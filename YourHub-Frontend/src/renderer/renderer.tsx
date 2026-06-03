import { createRoot } from 'react-dom/client';
import App from './src/App';
import '../index.css';

// Podpinamy React pod główne drzewo dokumentu (index.html)
const rootElement = document.getElementById('root');
if (rootElement) {
  const root = createRoot(rootElement);
  root.render(<App />);
} else {
  // Jeśli z jakiegoś powodu w index.html brakuje <div id="root"></div>, 
  // tworzymy element ręcznie
  const fallbackRoot = document.createElement('div');
  fallbackRoot.id = 'root';
  document.body.appendChild(fallbackRoot);
  const root = createRoot(fallbackRoot);
  root.render(<App />);
}

console.log('React zamontowany poprawnie w Renderer!');
