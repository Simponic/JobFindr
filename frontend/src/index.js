import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserForm } from './components/user_form/_user_form';
import { LogIn } from './components/log_in/_log_in';
import { NotFound } from './components/errors/not_found';
import { AvailabilitySelector } from './components/availability_selector/availability_selector';
import { LoadingAvailability } from './components/availability_selector/loading';
import { About } from './components/about_page/about';

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} >
        <Route path="sign-up" element={<UserForm newUser={true} />} />
        <Route path="profile/:id/edit" element={<UserForm newUser={false} />} />
        <Route path="login" element={<LogIn />} />
        <Route path="worker/:id/availability" element={<AvailabilitySelector />} />
        <Route path="worker/load-availability" element={<LoadingAvailability />} />
        <Route path="about" element={<About />} />
        <Route
          path="*"
          element={<NotFound />}
        />
      </Route>
    </Routes>
  </BrowserRouter>,
  document.getElementById('root')
);
