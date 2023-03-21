import { BrowserRouter } from 'react-router-dom';
import MainRoute from './route/MainRoute';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import './style/index.css';

function App() {
	return (
		<div className="App">
			<BrowserRouter>
				<MainRoute />
			</BrowserRouter>

		</div>
	);
}

export default App;
