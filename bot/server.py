# server.py
from aiohttp import web
import asyncio
import os


async def run_http_server():
    app = web.Application()
    app.router.add_get("/", lambda r: web.Response(text="Bot is running"))

    runner = web.AppRunner(app)
    await runner.setup()

    port = int(os.getenv("PORT", 8001))
    site = web.TCPSite(runner, '0.0.0.0', port)
    await site.start()
    print(f"HTTP server started on port {port}")
    await asyncio.Event().wait()  # Keep running


async def start_bot():
    from src.app import start_polling
    await start_polling()  # Запуск бота через polling


async def main():
    await asyncio.gather(
        run_http_server(),
        start_bot()
    )


if __name__ == "__main__":
    asyncio.run(main())