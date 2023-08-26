import BigCalendar from './Calendar'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import DetailPage from './DetailPage';
import PostPage from './CreatePost';
import ReelStoryPage from './CreateReelStory';
import SignInSide from './SignInSide';
import SignUpPage from './SignUp';
import PanelBoard from './PanelBoard';
import { AuthenticatedRoute } from './AuthenticatedRoute'


const App = () => {
  return (
    <div>
        <Router>
        <Routes>
          <Route path="/" element={ <SignInSide />} />
          <Route path="/calendar" element={<BigCalendar authorize={AuthenticatedRoute}/>}/>
          <Route path="/page/:date" element={<DetailPage authorize={AuthenticatedRoute}/>} />
          <Route path="/create-post" element={<PostPage authorize={AuthenticatedRoute}/>} />
          <Route path="/create-story" element={<ReelStoryPage authorize={AuthenticatedRoute}/>}/>
          <Route path="/sign-up" element={<SignUpPage authorize={AuthenticatedRoute}/>} />
          <Route path="/panel" element={<PanelBoard authorize={AuthenticatedRoute}/>} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
