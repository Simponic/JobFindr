import { Form, Button } from "react-bootstrap";

export const ContactForm = () => {
	
	const submit = async (e) => {
		e.preventDefault();
	
	}

	return (
		<div className="mx-5">
			<Form onSubmit={submit}>
				<h1 className="text-center">Contact us!</h1>
				<Form.Group className="mb-3">
					<Form.Label>Leave us a message below</Form.Label>
					<Form.Control as="textarea" rows={4}/>
				</Form.Group>
				<Button variant="primary" type="submit">
					Submit
				</Button>
			</Form>
		</div>
	)
}
