from celery import Celery
from src.settings.redis import RedisSettings
from src.clients.celery.tasks import CeleryTasks
class CeleryApp:
    def __init__(self):
        self.app = Celery('example', broker="redis://0.0.0.0:6379")
        self._register_tasks()
        self.tasks = CeleryTasks()

    def _register_tasks(self):

        @self.app.task(name='add_task')
        def add(x, y):
            print(self.tasks.add_x_y(x=x, y=y))

        self.add = add


celeryapp = CeleryApp()
app=celeryapp.app
