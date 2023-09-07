import BigCalendar from './Calendar'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import DetailPage from './DetailPage';
import PostStoryPage from './CreatePostStory';
import ReelHighlightPage from './CreateReelHighlightPage';
import SignInSide from './SignInSide';
import SignUpPage from './SignUp';
import PanelBoard from './PanelBoard';


const App = () => {
  return (
    <div>
        <Router>
        <Routes>
          <Route path="/" element={ <SignInSide />} />
          <Route path="/calendar" element={<BigCalendar />}/>
          <Route path="/page/:date" element={<DetailPage />} />
          <Route path="/create-post" element={<PostStoryPage />} />
          <Route path="/create-reel" element={<ReelHighlightPage />}/>
          <Route path="/sign-up" element={<SignUpPage />} />
          <Route path="/panel" element={<PanelBoard/>} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
