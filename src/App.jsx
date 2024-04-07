import { Route, Routes } from "react-router-dom";
import Signup from "./pages/signup/Signup";
import Login from "./pages/login/Login";
import Header from "./components/header/Header";
import { Box } from '@chakra-ui/react';

const App = () => {
  return (
    <>
      <Header />
      <Box mt={5} />
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />

      </Routes>
    </>
  );
};

export default App;