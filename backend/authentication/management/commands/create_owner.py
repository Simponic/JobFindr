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

    parser.add_argument(
      '--home-latitude',
      type=str,
      help='Specify home latitude',
    )

    parser.add_argument(
      '--home-longitude',
      type=str,
      help='Specify home longitude',
    )

    parser.add_argument(
      '--address',
      type=str,
      help='Specify home address',
    )

  def handle(self, *args, **options):
    email = options['email']
    phone_number = options['phone_number']
    password = options['password']
    name = options['first_name'] + " " + options['last_name']

    admin = User(email=email, phone_number=phone_number, name=name, role=Role.OWNER, home_address=options['home_address'], home_latitude=options['home_latitude'], home_longitude=options['home_longitude'], avatar="https://c1.alamy.com/thumbs/tcxt95/admin-icon-vector-male-user-person-profile-avatar-with-gear-cogwheel-for-settings-and-configuration-in-flat-color-glyph-pictogram-illustration-tcxt95.jpg")
    admin.set_password(password)
    admin.save()