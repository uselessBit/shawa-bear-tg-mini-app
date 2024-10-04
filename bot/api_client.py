import ssl

import aiohttp


async def without_ssl():
    ssl_context = ssl.create_default_context()
    ssl_context.check_hostname = False
    ssl_context.verify_mode = ssl.CERT_NONE
    return ssl_context


async def data_get(endpoint, params=None):
    ssl_context = await without_ssl()
    async with aiohttp.ClientSession() as session:
        async with session.get(endpoint, params=params, ssl=ssl_context) as response:
            if response.status == 200:
                return await response.json()
            return None


async def data_post(endpoint, form_data=None):
    ssl_context = await without_ssl()
    async with aiohttp.ClientSession() as session:
        async with session.post(endpoint, data=form_data, ssl=ssl_context) as response:
            if response.status == 200:
                return await response.json()
            return None
