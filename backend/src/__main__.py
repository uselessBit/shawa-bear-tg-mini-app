from src.settings.uvicorn import UvicornSettings
import uvicorn
from dotenv import load_dotenv
from src.server.app import create_application

if __name__ == "__main__":
    load_dotenv()
    settings = UvicornSettings()
    uvicorn.run(
        create_application,
        **settings.model_dump(),
        ssl_keyfile="localhost-key.pem",
        ssl_certfile="localhost.pem",
    )
