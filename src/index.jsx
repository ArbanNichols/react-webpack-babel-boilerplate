import App from './App';
import './index.css';

const title = 'React with Webpack and Babel (Advanced)';

ReactDOM.render(
  <React.StrictMode>
    <App title={title} />
  </React.StrictMode>,
  document.getElementById('app')
);

module.hot.accept();
