import { Table, Container, Button } from 'react-bootstrap';
import { useState, useEffect, useContext } from 'react';
import { APIUserContext } from "../../services/api";


export const ViewContactForms = () => {
  const api = useContext(APIUserContext);
  const [forms, setForms] = useState([]);
  const [error, setError] = useState('');

  const fetchForms = async () => {
    const res = await api.get('/api/contact/all-forms');
    console.log(res);
    if (res.success) {
      setForms(res.forms);
    } else if (res.message) {
      setError(res.message);
    }
  }

  useEffect(() => {
    fetchForms();
  }, []);


  return (
    <Container>
      <h1 className="mt-5">Contact Forms</h1>
      <Table className="mb-5" striped bordered hover>
        <thead>
          <tr>
            {console.log(forms)}
            <th>Form id</th>
            <th>Email</th>
            <th>Message</th>
            <th>Status</th>
            <th>Job id</th>
            <th>User id</th>
          </tr>
        </thead>
        <tbody>
          {forms.map((form) => (
          <tr key={form.id}>
            <td>{form.id}</td>
            <td>{form.email}</td>
            <td>{form.body}</td>
            <td>
              <Button variant="secondary">{form.status}</Button>
            </td>
            <td>{form.job_id}</td>
            <td>{form.user_id} </td>
          </tr>
          ))}
        </tbody>
      </Table>  
      <p className="text-danger">{error}</p>
    </Container>                              
  ) 
}