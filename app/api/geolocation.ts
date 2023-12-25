import { createEffect } from 'effector-next'
import { IGeolocation } from '../../types/common'
import api from '../axiosClient'

export const getGeolocationFx = createEffect(
  async ({ latitude, longitude }: IGeolocation) => {
    const geoUrl: string = `https://api.geoapify.com/v1/geocode/reverse?`
    const data = await api.get(
      `${geoUrl}lat=${latitude}&lon=${longitude}&lang=az&apiKey=${process.env.NEXT_PUBLIC_GEOAPI_KEY}`,
      { withCredentials: false }
    )

    return data
  }
)
