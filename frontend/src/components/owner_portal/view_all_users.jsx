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
      <h1 className="mt-5" >Site Users</h1>
      <Table className="mb-5" striped bordered hover>
        <thead>
          <tr>
            <th>id</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody className="portal-table">
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