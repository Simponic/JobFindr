import { Form, Button } from "react-bootstrap";
import { useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { APIUserContext } from "../../services/api";
import { AuthContext } from "../../services/auth";

import toast from "react-hot-toast";

export const ContactForm = () => {
	const { id } = useParams(); // This is the job id we will dispute
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
		if (id) { 
			setJobId(id);
		}
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
				<h1 className="text-center">Contact us!</h1>
				<Form.Group className="mb-3">
					<Form.Label>Email*</Form.Label>
          <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} required />
				</Form.Group>
				<Form.Group className="mb-3">
					<Form.Label>Leave us a message below</Form.Label>
					<Form.Control as="textarea" value={body} onChange={(e) => setBody(e.target.value)} placeholder="Hi, my name is Johnny Appleseed and I..." rows={4}/>
				</Form.Group>
				{auth.user?.id ? 
					<>
						<Form.Group className="mb-3">
							<Form.Label>Job id</Form.Label>
							<Form.Control type="number" placeholder="Enter job id" value={jobId} onChange={(e) => setJobId(e.target.value)} />
						</Form.Group>
						<div>
							You can add a job id to dispute it if:
							<ul>
								<li>You are the customer associated with the job, and the job is <br />1) assigned to a worker and the assigned worker's scheduled end time has passed or <br />2) marked as complete</li>
								<li>You are a worker assigned to the job, and the job has not been marked as complete</li>
							</ul>
						</div>
					</>
					: null}
				<Button variant="primary" type="submit">
					Submit
				</Button>
			</Form>
		</div>
	)
}
