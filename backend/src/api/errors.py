class BaseError(Exception):
    def __init__(self, message: str = ""):
        self.message = message
        super().__init__(message)


class InvalidUrlError(BaseError):
    def __init__(self, message: str = "Invalid url"):
        super().__init__(message)