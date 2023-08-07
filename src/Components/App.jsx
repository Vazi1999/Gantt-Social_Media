import BigCalendar from './Calendar'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DetailPage from './DetailPage';


const App = () => {


  return (
    <div>
    <Router>
      <Routes>
        <Route path="/" element={<BigCalendar />} />
        <Route path="/page/:date" element={<DetailPage />} />
      </Routes>
    </Router>
    </div>
  );
};

export default App;
