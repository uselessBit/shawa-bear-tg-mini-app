import inspect
import logging
from http import HTTPStatus

from fastapi import FastAPI, Request, status
from starlette.responses import JSONResponse

from src.services import errors

logger = logging.getLogger(__name__)


async def errors_handler(request: Request, exc: errors.BaseError) -> JSONResponse:
    message = exc.message
    logger.error(message)
    match exc:
        case (
            errors.UserNotFoundError()
            | errors.SizeNotFoundError()
            | errors.ProductNotFoundError()
            | (errors.PriceNotFoundError() | errors.OrderNotFoundError() | errors.IngredientNotFoundError())
            | (errors.BasketNotFoundError() | errors.BasketItemNotFoundError())
        ):
            status_code = status.HTTP_400_BAD_REQUEST
        case _:
            status_code = status.HTTP_501_NOT_IMPLEMENTED
            message = HTTPStatus.NOT_IMPLEMENTED.phrase
    return JSONResponse(
        status_code=status_code,
        content={"detail": message},
    )


def patch_exception_handlers(app: FastAPI) -> None:
    for _, obj in inspect.getmembers(errors):
        if inspect.isclass(obj) and (issubclass(obj, errors.BaseError)):
            app.add_exception_handler(obj, errors_handler)
