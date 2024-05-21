import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import { getBarnById } from '@/app/api/barn'
import { IBarnItem } from '@/types/barn'
import styles from '@/styles/barn/index.module.scss'

const UpdateBarn = () => {
    const { query } = useRouter()
    const [barnObj, setBarnObj] = useState<IBarnItem>({
        id: 0,
        userId: 0,
        productId: 0,
        username: '',
        name: '',
        azencoCode: '',
        type: '',
        unit: '',
        img: '',
        location: '',
        newStock: '',
        usedStock: '',
        brokenStock: '',
        totalStock: '',
        price: '',
        newTotalPrice: '',
        usedTotalPrice: '',
        brokenTotalPrice: '',
        totalPrice: '',
        lostNewStock: '',
        lostUsedStock: '',
        lostBrokenStock: '',
        lostTotalStock: '',
        lostNewTotalPrice: '',
        lostUsedTotalPrice: '',
        lostBrokenTotalPrice: '',
        lostTotalPrice: '',
        createdAt: '',
        updatedAt: '',

    })

    const barnId = Number(query?.id ? query.id : 0)

    console.log(query)
    console.log(barnId)

    useEffect(() => {
        const installBarnState = async () => {
            const data = await getBarnById(barnId)
            setBarnObj(data)
        }

        installBarnState()
    }, [barnId])


    console.log(barnObj)
    return <div>
        <h1>Updated Barn{`${query.id}`}</h1>
        <h1>{barnObj.name}</h1>
    </div>
}

export default UpdateBarn