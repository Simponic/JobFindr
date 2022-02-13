import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SignUp } from './components/sign_up/_sign_up';
import { LogIn } from './components/log_in/_log_in';
import { NotFound } from './components/errors/not_found';

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} >
        <Route path="sign-up" element={<SignUp />} />
        <Route path="login" element={<LogIn />} />
        <Route
          path="*"
          element={<NotFound />}
        />
      </Route>
    </Routes>
  </BrowserRouter>,
  document.getElementById('root')
);
