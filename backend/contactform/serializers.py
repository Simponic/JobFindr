def serialize_contact_form(contact_form):
  return {
    'id': contact_form.id,
    'email': contact_form.email,
    'body': contact_form.body,
    'status': contact_form.status,
    'job_id': contact_form.job_id,
    'user_id': contact_form.user_id,
  }