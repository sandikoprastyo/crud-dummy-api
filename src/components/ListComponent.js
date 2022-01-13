import React from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { config, URL } from '../config';
// style component
const Image = styled.img`
border-radius: 50px;"
object-fit: center;
`;

export default function ListComponent({ data, handleGetUser }) {
  const [edit, setEdit] = React.useState(false);
  const [dataEditFirstName, setDataEditFirstName] = React.useState();
  const [dataEdiLastName, setDataEditLastName] = React.useState();
  const [dataEditId, setDataEditId] = React.useState();

  const [error, setError] = React.useState();
  const [success, setSuccess] = React.useState();

  const handleDelete = (val) => {
    axios
      .delete(`${URL}/${val}`, config)
      .then((res) => {
        if (res.status === 200) {
          handleGetUser();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleEdit = (val) => {
    setDataEditId(val.id);
    setDataEditFirstName(val.firstName);
    setDataEditLastName(val.lastName);
    setEdit(true);
  };

  const HandleUpdate = () => {
    const body = {
      firstName: dataEditFirstName,
      lastName: dataEdiLastName,
    };
    axios
      .put(`${URL}/${dataEditId}`, body, config)
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          setEdit(false);
          handleGetUser();
          setSuccess('success');
        }
      })
      .catch((err) => setError(err.message));
  };

  return (
    <React.Fragment>
      {edit ? (
        <div className='edit'>
          <h1>Edit </h1>
          <input
            type='text'
            value={dataEditFirstName}
            onChange={(e) => setDataEditFirstName(e.target.value)}
          />
          <input
            type='text'
            value={dataEdiLastName}
            onChange={(e) => setDataEditLastName(e.target.value)}
          />
          <button onClick={HandleUpdate}>Update</button>
          <button onClick={() => setEdit(false)}>Back</button>
          {success ? <p>{success}</p> : null}
          {error ? <p style={{ color: 'red' }}>{error}</p> : null}
        </div>
      ) : (
        <div style={{ marginTop: '50px' }}>
          {data?.map((el, i) => {
            return (
              <div key={i}>
                <Image src={el.picture} alt='foto' width='50' height='50' />
                <p>{`${el.firstName}  ${el.lastName}`}</p>
                <button onClick={() => handleDelete(el.id)}>Delete</button>
                <button onClick={() => handleEdit(el)}>Edit</button>
              </div>
            );
          })}
        </div>
      )}
    </React.Fragment>
  );
}
