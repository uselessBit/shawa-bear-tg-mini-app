import React, {useEffect, useState} from 'react';
import {Box, Flex, Grid, Image, Text, Heading} from '@chakra-ui/react';
import {Link} from "react-router-dom";


const ProductCard = ({product, onProductClick}) => {
    return (
        <Link href="#" onClick={() => onProductClick(product.id)}> {/* Добавили ссылку */}
            <Box
                // borderRadius="md"
                overflow="hidden"
                width="100%"
                p={2}
                mb={2}
                sx={{
                    padding: '2', // Отступ со всех сторон
                    margin: '0', // Убираем отступ у карточки в сетке
                }}
            >
                <Image src={product.imageUrl} alt={product.name} borderRadius="lg" w="full" h="full"
                       objectFit="cover"/> {/* Картинка на всю карточку */}
            </Box>
        </Link>
    );
};

const ProductGrid = ({products, onProductClick}) => {
    return (
        <Grid
            templateColumns="repeat(2, 1fr)" // 2 колонки на всех устройствах
            gap={0} // Уменьшили отступ между карточками
        >


            {products.map((product) => (
                <ProductCard key={product.id} product={product} onProductClick={onProductClick}/>
            ))}
        </Grid>
    );
};

const Menu = () => {
    const [products, setProducts] = useState([]); // Добавляем состояние для товаров

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('https://127.0.0.1:8000/products/get_products');
                setProducts(response.data); // Предположим, что API возвращает объект с полем jobs, содержащим массив работ
            } catch (error) {
                console.error("Ошибка при получении данных:", error);

            }
        };
    }, []); // Выполняем только один раз при монтировании компонента

    const handleProductClick = (productId) => {
        // Логика перехода на страницу товара
        console.log("Product clicked:", productId);
    };

    // const products = [
    //     {
    //         id: 1,
    //         name: 'Product 1',
    //         description: 'Description of Product 1',
    //         price: 10,
    //         imageUrl: 'media/fe4ce7d5-14e8-45a9-b83b-50e91d0e9c86.png',
    //     },
    //     {
    //         id: 2,
    //         name: 'Product 2',
    //         description: 'Description of Product 2',
    //         price: 20,
    //         imageUrl: 'media/fe4ce7d5-14e8-45a9-b83b-50e91d0e9c86.png',
    //     },
    // ];

    return (
        <Box>
            {products.length > 0 ? (
                <ProductGrid products={products} onProductClick={handleProductClick}/>
            ) : (
                <Text>Loading products...</Text>
            )}
        </Box>
    );
};

export default Menu;
