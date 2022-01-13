import React from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import ListComponent from '../src/components/ListComponent';
import { config, URL } from './config';

function App() {
  const [data, setData] = React.useState();
  const [error, setError] = React.useState();
  const [success, setSuccess] = React.useState();

  const [firstName, setFirstName] = React.useState();
  const [lastName, setLastName] = React.useState();
  const [email, setEmail] = React.useState();

  const handlePostUser = () => {
    const body = {
      firstName: firstName,
      lastName: lastName,
      email: email,
    };
    axios
      .post(`${URL}/create`, body, config)
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          setSuccess('success')
          handleGetUser()
        }
      })
      .catch((err) => setError(err.message));
  };

  React.useEffect(() => {
    handleGetUser();
  }, []);

    const handleGetUser = () => {
    axios
      .get(URL, config)
      .then((res) => {
        if (res.status === 200) {
          setData(res.data.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
    }
  
  return (
    <div className='App'>sucess
      <header className='App-header'>
        <img src={logo} className='App-logo' alt='logo' />
        <div>
        <h1>Created</h1>
          <input type='text' placeholder="FirstName" onChange={(e) => setFirstName(e.target.value)} />
          <input type='text' placeholder="LastName" onChange={(e) => setLastName(e.target.value)} />
          <input type='email' placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
          <button onClick={handlePostUser}>Save</button>
          {
            success ?  <p>{success}</p> : null
          }
          {
            error ? <p style={{color: 'red'}}>{error}</p> : null
          }
          
        </div>
        <ListComponent data={data} handleGetUser={handleGetUser} />
      </header>
    </div>
  );
}

export default App;
