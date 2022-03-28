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
    'title': job.get_title(),
    'job_type': serialize_jobtype(job.job_type),
    'price': job.price,
    'time_estimate': job.time_estimate,
    'start_time': job.start_time,
    'end_time': job.end_time,
    'address': job.address,
    'coords': {
      'lat': job.latitude,
      'lng': job.longitude,
    },
    'comment': job.comment,
    'status': job.status,
    'user_id': job.user.id,
  }

def serialize_job_time(job_time):
  return {
    'id': job_time.id,
    'start_time': job_time.start_time,
    'end_time': job_time.end_time,
    'job_id': job_time.job.id,
  }