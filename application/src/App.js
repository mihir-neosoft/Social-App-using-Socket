import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Container from '@mui/material/Container';
import Post from './components/Post';
import Register from './components/Register';
import Home from './components/Home';
import Login from './components/Login';
import Mypost from './components/Mypost';

function App() {
  return (
    <Router>
      <Container>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/post/:id" element={<Post />} />
          <Route path="/mypost" element={<Mypost />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
