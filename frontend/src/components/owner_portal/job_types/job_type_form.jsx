import { Form, Button } from 'react-bootstrap';
import { useState, useContext} from "react";
import { useNavigate } from "react-router-dom";
import { APIUserContext } from "../../../services/api";
import toast from "react-hot-toast";
import { NotFound } from "../../errors/not_found";
import { AuthContext } from '../../../services/auth';

export const JobTypeForm = () => {
  const api = useContext(APIUserContext);
	const [name, setName] = useState('');
	const [icon, setIcon] = useState('');
	const navigate = useNavigate();
	const auth = useContext(AuthContext);

	// Only take from gi library
	const icons = require('react-icons/gi');

	const submit = async (e) => {
		e.preventDefault();

		if (!(icon in icons)) {
			toast.error('Please enter a valid icon name');
			return;
		}
		else {
			const res = await api.post(`/api/jobs/create-new-job-type`, {
				name,
				icon,
			});
	
			if (res.success) {
				toast.success(`'${name}' has been successfully added!`);
				navigate('/owner/manage-job-types');
			} else {
				toast.error(res.message);
			}
		}
	}

	return (
		<div className="mx-5">
			{auth.user.role === 'owner' ? 
			(<Form onSubmit={submit}>
				<h1 className="text-center mt-5">New Job Type</h1>
				<Form.Group className="mb-3">
					<Form.Label>Name*</Form.Label>
          <Form.Control type="text" placeholder="ex. 'Snow Shoveling'" maxLength={50} value={name} onChange={(e) => setName(e.target.value)} required />
				</Form.Group>
				<Form.Group className="mb-3">
					<Form.Label>Job Type Icon*</Form.Label>
					<Form.Control type="text" maxLength={40} value={icon} onChange={(e) => setIcon(e.target.value)} placeholder="ex. 'GiSnowing'" required/>
				</Form.Group>
				<div>
					To get an icon:
					<ul>
						<li>Access the icon library <a target="_blank" rel="noopener noreferrer" href="https://react-icons.github.io/react-icons/icons?name=gi">here</a></li>
						<li>Locate the icon you want and click on it to copy it</li>
						<li>Paste the name under 'Job Type Icon' <br/> * The name MUST come from the Game Icon library (names must start with 'Gi')</li>
						
					</ul>
				</div>
				<Button variant="primary" type="submit">
					Create
				</Button>
			</Form>) : <NotFound />}
		</div>
	)
}


