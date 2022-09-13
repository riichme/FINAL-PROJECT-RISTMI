// Import All needed dependencies
import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert'

// Impprt action
import { userLogout } from '../../app/Features/Auth/actions';

const Logout = () => {
  // Initial the useDispatch from redux
  // Dispatch an action, so that it triggers a global state change
  const dispatch = useDispatch();

  // navigate is used for going to another pages
  const navigate = useNavigate();

  // Event handler to click logout button
  const handleLogout = () => {
    swal({
      title: "Are you sure?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((okay) => {
      if (okay) {
        dispatch(userLogout());
        swal("Logout Success!", "", "success");
        navigate('/')
      }
    });
  }

  return (
    <div className='float-right'>
        <button onClick={handleLogout} type="button" className=" w-[10rem] focus:outline-none text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium text-sm px-5 py-2.5 mb-2 rounded">Logout</button>
    </div>
  )
}

export default Logout