from authentication.models import WorkerAvailability

def serialize_user(user):
  return {
    'id': user.id,
    'name': user.name,
    'email': user.email,
    'phone_number': user.phone_number,
    'avatar': user.avatar,
    'home_address': user.home_address,
    'home_latitude': user.home_latitude,
    'home_longitude': user.home_longitude,
    'balance': user.balance,
    'role': user.role,
  }

def serialize_public_user_fields(user):
  serialized = serialize_user(user)
  del serialized['home_address']
  del serialized['home_latitude']
  del serialized['home_longitude']
  del serialized['balance']
  return serialized

def serialize_worker_availability(worker_availability):
  return {
    'id': worker_availability.id,
    'day': worker_availability.day,
    'start_hour': worker_availability.start_hour,
    'end_hour': worker_availability.end_hour,
    'start_minute': worker_availability.start_minute,
    'end_minute': worker_availability.end_minute,
  }

def serialize_worker(worker):
  return {
    'id': worker.id,
    'availability': [serialize_worker_availability(x) for x in worker.workeravailability_set.all()],
  }