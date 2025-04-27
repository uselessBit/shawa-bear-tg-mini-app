class BaseError(Exception):
    def __init__(self, message: str = ""):
        self.message = message
        super().__init__(message)


class UserNotFoundError(BaseError):
    def __init__(self, message: str = "User not found error"):
        super().__init__(message)


class SizeNotFoundError(BaseError):
    def __init__(self, message: str = "Size not found error"):
        super().__init__(message)


class ProductNotFoundError(BaseError):
    def __init__(self, message: str = "Product not found error"):
        super().__init__(message)


class PriceNotFoundError(BaseError):
    def __init__(self, message: str = "Price not found error"):
        super().__init__(message)


class OrderNotFoundError(BaseError):
    def __init__(self, message: str = "Order not found error"):
        super().__init__(message)


class IngredientNotFoundError(BaseError):
    def __init__(self, message: str = "Ingredient not found error"):
        super().__init__(message)


class BasketNotFoundError(BaseError):
    def __init__(self, message: str = "Basket not found error"):
        super().__init__(message)


class BasketItemNotFoundError(BaseError):
    def __init__(self, message: str = "Basket item not found error"):
        super().__init__(message)


class KeyAlreadyExistsError(BaseError):
    def __init__(self, name: str, message: str = "Name '{}' already exists"):
        formatted_message = message.format(name)
        super().__init__(formatted_message)
        self.name = name
