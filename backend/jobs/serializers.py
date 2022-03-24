def serialize_jobtype(job_type):
  return {
    'id': job_type.id,
    'job_type': job_type.job_type,
    'icon': job_type.icon,
    'archived': job_type.archived,
  }

def serialize_job(job):
  return {
    'id': job.id,
    'job_type': serialize_jobtype(job.job_type),
    'price': job.price,
    'time_estimate': job.time_estimate,
    'start_time': job.start_time,
    'end_time': job.end_time,
    'address': job.address,
    'latitude': job.latitude,
    'longitude': job.longitude,
    'comment': job.comment,
    'status': job.status,
    'user_id': job.user.id,
  }