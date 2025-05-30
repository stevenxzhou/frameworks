import Todo from '../widgets/TodoWithReducer';
import Calendar from '../widgets/Calendar'
import { ThemeProvider } from "../context/useTheme";
import Greeting from '../widgets/Greeting';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Carousel from '../widgets/Carousel';
import MeControl from '../widgets/MeControl';
import LazyLoad from '../widgets/LazyLoad';

function Main() {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Greeting />} />
          <Route path="/todo/:id" element={<Todo />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/carousel" element={<Carousel/>} />
          <Route path="/mecontrol" element={<MeControl/>} />
          <Route path="/lazyload" element={<LazyLoad />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default Main;
