import inspect
import logging
from http import HTTPStatus

from fastapi import FastAPI, Request
from starlette.responses import JSONResponse

from src.services import errors

logger = logging.getLogger(__name__)


ERROR_STATUS_MAP = {
    errors.UserNotFoundError: HTTPStatus.BAD_REQUEST,
    errors.SizeNotFoundError: HTTPStatus.BAD_REQUEST,
    errors.ProductNotFoundError: HTTPStatus.BAD_REQUEST,
    errors.PriceNotFoundError: HTTPStatus.BAD_REQUEST,
    errors.OrderNotFoundError: HTTPStatus.BAD_REQUEST,
    errors.IngredientNotFoundError: HTTPStatus.BAD_REQUEST,
    errors.BasketNotFoundError: HTTPStatus.BAD_REQUEST,
    errors.BasketItemNotFoundError: HTTPStatus.BAD_REQUEST,
    errors.KeyAlreadyExistsError: HTTPStatus.BAD_REQUEST,
}


async def errors_handler(request: Request, exc: errors.BaseError) -> JSONResponse:
    status_code = ERROR_STATUS_MAP.get(type(exc), HTTPStatus.NOT_IMPLEMENTED)
    message = exc.message if status_code != HTTPStatus.NOT_IMPLEMENTED else HTTPStatus.NOT_IMPLEMENTED.phrase
    logger.error(message)
    return JSONResponse(status_code=status_code, content={"detail": message})


def patch_exception_handlers(app: FastAPI) -> None:
    for _, obj in inspect.getmembers(errors):
        if inspect.isclass(obj) and issubclass(obj, errors.BaseError):
            app.add_exception_handler(obj, errors_handler)
