# Generated by Django 4.0.1 on 2022-03-23 21:11

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('jobs', '0004_remove_jobtype_available_jobtype_archived'),
        ('authentication', '0004_alter_worker_user'),
    ]

    operations = [
        migrations.AddField(
            model_name='worker',
            name='job_types',
            field=models.ManyToManyField(blank=True, to='jobs.JobType'),
        ),
    ]