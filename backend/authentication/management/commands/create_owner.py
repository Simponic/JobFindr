from django.core.management.base import BaseCommand, CommandError
from authentication.models import User, Role

class Command(BaseCommand):
  def add_arguments(self, parser):
    parser.add_argument(
      '--email',
      type=str,
      help='Specify the owner email',
    )

    parser.add_argument(
      '--phone-number',
      type=str,
      help='Specify the owner phone number',
    )

    parser.add_argument(
      '--password',
      type=str,
      help='Specify the owner password',
    )

    parser.add_argument(
      '--first-name',
      type=str,
      help='Specify the owner first name',
    )

    parser.add_argument(
      '--last-name',
      type=str,
      help='Specify the owner last name',
    )

  def handle(self, *args, **options):
    print(options)
    email = options['email']
    phone_number = options['phone_number']
    password = options['password']
    name = options['first_name'] + " " + options['last_name']

    admin = User(email=email, phone_number=phone_number, name=name, role=Role.OWNER)
    admin.set_password(password)
    admin.save()