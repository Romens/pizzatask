import React from 'react';
import { Link } from 'react-router-dom';
import {useAuth} from '../context/auth';

function GuestNav () {
  return (
    <div className="w-full px-6 mx-auto flex items-center justify-between">
      <ul className="list-reset flex pt-4">
        <li className="px-2">
          <Link to=""
            className="no-underline text-gray-700 uppercase font-thin"
          >Pizza Task</Link>
        </li>
      </ul>

      <ul className="list-reset flex pt-4">
        <li className="px-4 py-2 border bg-indigo-500 rounded-lg">
          <Link to="/register"
            className="no-underline text-white font-semi-bold"
          >{currentUser ? currentUser.name : 'Your Account'}</Link>
        </li>
      </ul>
    </div>
  );
};

export default GuestNav;
