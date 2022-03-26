import { Table, Container } from 'react-bootstrap';
import { useState, useEffect, useContext } from 'react';
import { APIUserContext } from "../../services/api";
import { useNavigate } from 'react-router-dom';


export const ViewAllUsers = () => {
  const api = useContext(APIUserContext);
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');

  const fetchUsers = async () => {
    const res = await api.get('/api/user/all-users');
    if (res.success) {
      console.log(res);
      setUsers(res.users);
    } else if (res.message) {
      setError(res.message);
    }
  }

  useEffect(() => {
    fetchUsers();
  }, []);


  return (
    <Container>

      <Table className="mt-5" striped bordered hover>
        <thead>
          <tr>
            <th>id</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr onClick={() =>(navigate(`/profile/${user.id}/edit`))} key={user.id}>
              <td>{user.id}</td> 
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
            </tr>
          ))}
        </tbody>
      </Table>  
      <p className="text-danger">{error}</p>
    </Container>                              
  ) 
}