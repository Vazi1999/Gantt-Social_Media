import BigCalendar from './Calendar'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DetailPage from './DetailPage';
import PostPage from './CreatePost';
import ReelStoryPage from './CreateReelStory';
import SignInSide from './SignInSide';
import SignUpPage from './SignUp';

const App = () => {


  return (
    <div lang='he' dir='rtl'>
        <Router>
        <Routes>
          <Route path="/" element={<SignInSide />} />
          <Route path="/calender" element={<BigCalendar />} />
          <Route path="/page/:date" element={<DetailPage />} />
          <Route path="/create-post" element={<PostPage />} />
          <Route path="/create-story" element={<ReelStoryPage />} />
          <Route path="/sign-up" element={<SignUpPage />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
