// import { Button } from '@chakra-ui/react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import  HomePage  from './Pages/HomePage';
import ChatPage from './Pages/ChatPage';

function App() {
  return (
    <div className="App">
       
      <Routes>
        <Route path="/" element={<HomePage />} exact />
        <Route path="/chat" element={<ChatPage />} />
      </Routes>
      {/* <Button colorScheme='teal'>Button</Button> */}
    </div>
  );
}

export default App;
