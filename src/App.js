import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import NotFound from "./components/NotFound/notFound";
import SearchApp from "./components/searchApp";

import "./App.css";
import TopBar from "./components/Topbar/topBar";
import { useEffect } from "react";
import { initStorage } from "./utils/storage";

function App() {
  // //* Set some default value in local storage after all components rendered
  // useEffect(() => {
  //   initStorage();
  // }, []);
  return (
    <BrowserRouter>
      <TopBar />
      <div className="App">
        <Routes>
          <Route path="/" element={<SearchApp />} />
          <Route path="/not-found" element={<NotFound />} />
          <Route path="*" element={<Navigate replace to="/not-found" />} />
        </Routes>
        <ToastContainer theme="colored" position="bottom-right" />
      </div>
    </BrowserRouter>
  );
}

export default App;
