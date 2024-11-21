# Telegram mini app

## Backend

### Architecture

- src
  - server
    - app.py
    - handle_errors.py
    - routers
      - v1
        - routers.py
        - size_router.py
        - ingredient_router.py
        - product_router.py
        - price_router.py
        - basket_router.py
        - order_router.py
        - user_router.py
  - services
    - size
      - service.py
      - interface.py
      - schemas.py
      - errors.py
    - ingredient
    - product
    - price
    - basket
    - order
    - user
    - errors.py
  - clients
    - database
      - models
        - size.py
        - ingredient.py
        - product.py
        - price.py
        - basket.py
        - order.py
        - user.py
      - engine.py
  - settings
    - config.py
  - main.py
  - container.py
- tests


```yaml
├── src
    ├── clients/
    ├── server/
    ├── service/         
    ├── settings/
    ├── container.py
    ├── __main__.py
└──  tests
```