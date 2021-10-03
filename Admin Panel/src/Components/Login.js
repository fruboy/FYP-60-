import React, { useContext, useState } from 'react';
import "../index.css";
import { UserContext } from '../userContext';
import { Modal} from 'antd';

function Login({ login }) {

  const { isloggedIn, setloggedIn } = useContext(UserContext);
  const [username, setUsername] = useState('');
  const [password, setpassword] = useState('');
  const [modalVisibility, setmodalVisibility] = useState(false);
  const [modalText, setmodalText] = useState('');
  const submitHandler = () => {
    if (username === 'Admin' || username === 'admin') {
      if (password === 'admin123') {
        setloggedIn(true);
      }
      else {
        setmodalText("Password Incorrect");
        showModal();
      }
    }
    else if (username === '') {
      setmodalText("Enter Username");
      showModal();
    }
    else if (password === '') {
      setmodalText("Enter Password");
      showModal();
    }
    else {
      setmodalText("Username Incorrect");
      showModal();
    }
  };
  
  const showModal = () => {
    setmodalVisibility(true);
  };
  const hideModal = () => {
    setmodalVisibility(false);
  };
  return (
    <>
      {/* <Header /> */}
      <div className="min-h-screen flex items-center justify-center bg-white py-12 px-4 sm:px-6 lg:px-8 ">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">Sign in to Admin Panel</h2>
          </div>

          <form className="mt-8 space-y-6" onSubmit={(e) => { e.preventDefault() }} >
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="username" className="sr-only">
                  Username
                </label>
                <input
                  id="Username"
                  name="username"
                  type="username"
                  autoComplete="username"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setpassword(e.target.value)}
                />
              </div>
            </div>

            <div>
              <button
                onClick={submitHandler}
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                style={{ backgroundColor: "#1F2937", color: 'white' }}
              >
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
      <Modal
        title="Error"
        visible={modalVisibility}
        onOk={hideModal}
        onCancel={hideModal}
        okText="Ok"
        cancelText="Cancel"
      >
        <p>{modalText}</p>
      </Modal>
    </>
  )
}

export default Login;
