import { Form, Button } from "react-bootstrap";
import { useState, useContext, useEffect } from "react";
import { APIUserContext } from "../../services/api";
import { AuthContext } from "../../services/auth";

import toast from "react-hot-toast";

export const ContactForm = () => {
  const api = useContext(APIUserContext);
	const auth = useContext(AuthContext);

	const [jobId, setJobId] = useState('');
	const [body, setBody] = useState('');
	const [email, setEmail] = useState('');
		
  const fetchFields = async () => {
    const res = await api.get(`/api/user/${auth.user.id}`);
		setEmail(res.user.email);
  }

  useEffect(() => {
    if (auth.user?.id) {
      fetchFields();
    }
  }, []);

	const submit = async (e) => {
		e.preventDefault();

		const res = await api.post(`/api/contact/new`, {
			email,
			body,
			job_id: jobId ? jobId : null,
		});

		if (res.success) {
			toast.success("Message sent!");
		} else {
			toast.error(res.message);
		}
	}

	return (
		<div className="mx-5">
			<Form onSubmit={submit}>
				<h1 className="text-center mt-5">Contact us!</h1>
				<Form.Group className="mb-3">
					<Form.Label>Email*</Form.Label>
          <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} required />
				</Form.Group>
				<Form.Group className="mb-3">
					<Form.Label>Leave us a message below</Form.Label>
					<Form.Control as="textarea" className="job-desc" maxLength={2000} value={body} onChange={(e) => setBody(e.target.value)} placeholder="Hi, my name is Johnny Appleseed and I..." rows={4}/>
				</Form.Group>
				{auth.user?.id ? 
					<Form.Group className="mb-3">
						<Form.Label>Job id</Form.Label>
						<Form.Control type="number" placeholder="Enter job id" value={jobId} onChange={(e) => setJobId(e.target.value)} />
					</Form.Group>
					: null}
				<Button variant="primary" type="submit">
					Submit
				</Button>
			</Form>
		</div>
	)
}
