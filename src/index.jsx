import App from './App';

const title = 'React with Webpack and Babel (Advanced)';

ReactDOM.render(<App title={title} />, document.getElementById('app'));

module.hot.accept();
