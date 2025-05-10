import { Heading } from '@chakra-ui/react'
import { useEffect } from 'react'
import { useInView } from 'react-intersection-observer'

type CategoryTitleProps = {
    category: string
    onVisibilityChange: (category: string, visible: boolean) => void
}

export default function CategoryTitle({
    category,
    onVisibilityChange,
}: CategoryTitleProps) {
    const { ref, inView } = useInView({
        threshold: 0,
        rootMargin: '-90px 0px -30% 0px',
    })

    useEffect(() => {
        onVisibilityChange(category, inView)
    }, [inView])

    return (
        <Heading size="2xl" fontWeight="800" color="text" ref={ref}>
            {category}
        </Heading>
    )
}
