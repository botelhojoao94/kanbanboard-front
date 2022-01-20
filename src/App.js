import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Board from './components/Board'
import PageTop from './components/PageTop'


function App() {

    return (
        <div className="App d-flex flex-column">
            <PageTop />
            <Board />
        </div>
    );

}

export default App;
