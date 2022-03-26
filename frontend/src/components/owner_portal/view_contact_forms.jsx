import { Table, Container } from 'react-bootstrap';
import { useState, useEffect, useContext } from 'react';
import { APIUserContext } from "../../services/api";


export const ViewContactForms = () => {
  const api = useContext(APIUserContext);
  const [forms, setForms] = useState([]);
  const [error, setError] = useState('');

  const fetchForms = async () => {
    const res = await api.get('/api/contact/all-forms');
    if (res.success) {
      console.log(res);
      // setForms(res.forms);
    } else if (res.message) {
      setError(res.message);
    }
  }

  useEffect(() => {
    fetchForms();
  }, []);


  return (
    <Container>
      <Table className="mt-5 mb-5" striped bordered hover>
        <thead>
          <tr>
            <th>Job id</th>
            <th>Email</th>
            <th>Message</th>
          </tr>
        </thead>
        <tbody>
          {forms.map((form) => (
            <tr key={form.id}>
              {/* <td>{}</td> 
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td> */}
            </tr>
          ))}
        </tbody>
      </Table>  
      <p className="text-danger">{error}</p>
    </Container>                              
  ) 
}