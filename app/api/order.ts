import { createEffect } from 'effector-next'
import { AxiosError } from 'axios'
import api from '@/app/axiosClient'
import {
  ConfirmBarnUserDto,
  IDeleteOrderFromClientDto,
  IMessageAndErrorMessage,
  IOrderQuery,
  IOrderResponce,
  IOtherOrder,
  NewOrderDto,
  SendBarnUserDto,
} from '@/types/order'

// Запросы

// Получение всех заказов
export const getOrders = createEffect(async () => {
  try {
    const { data } = await api.get('order/all')
    return data
  } catch (error) {
    console.error(error)
    return { error_message: (error as AxiosError).message }
  }
})

// мои заказы
export const getMyOrders = createEffect(
  async ({
    clientId,
    clientUserName,
  }: {
    clientId: number
    clientUserName: string
  }) => {
    try {
      const { data } = await api.post('order/my', {
        clientId,
        clientUserName,
      })
      console.log(data)

      return data
    } catch (error) {
      console.log(error)
      return { error_message: (error as AxiosError).message }
    }
  }
)

// мои запросы на закак
export const postOtherOrders = createEffect(
  async ({ barnUserId, barnUsername }: IOtherOrder) => {
    try {
      const { data } = await api.post('order/other', {
        barnUserId,
        barnUsername,
      })
      console.log(data)

      return data
    } catch (error) {
      console.log(error)
      return { error_message: (error as AxiosError).message }
    }
  }
)

// Получение заказов с параметрами
export const getCountAndRowsOrders = createEffect(
  async (query: IOrderQuery) => {
    try {
      const { data } = await api.get('order', { params: query })
      return data
    } catch (error) {
      console.error(error)
      return { error_message: (error as AxiosError).message }
    }
  }
)

// Создание нового заказа
export const createNewOrder = createEffect(async (newOrderDto: NewOrderDto) => {
  try {
    const { data } = await api.post('order/create', newOrderDto)
    return data as IOrderResponce
  } catch (error) {
    console.error(error)
    return { error_message: (error as AxiosError).message }
  }
})

// Подтверждение пользователя склада
export const confirmBarnUserFx = createEffect(
  async (confirmBarnUserDto: ConfirmBarnUserDto) => {
    try {
      const { data } = await api.post(
        'order/confirm-barn-user',
        confirmBarnUserDto
      )
      console.log(data)
      return data as IMessageAndErrorMessage
    } catch (error) {
      console.error(error)
      return { error_message: (error as AxiosError).message }
    }
  }
)

// Подтверждение пользователя склада
export const deleteOrderFromClientFx = createEffect(
  async (deleteOrderFromClientDto: IDeleteOrderFromClientDto) => {
    try {
      const { data } = await api.post(
        'order/remove-client',
        deleteOrderFromClientDto
      )

      console.log(data)
      return data as IMessageAndErrorMessage
    } catch (error) {
      console.error(error)
      return { error_message: (error as AxiosError).message }
    }
  }
)

// Отправка заказа пользователю склада
export const sendBarnUser = createEffect(
  async (sendBarnUserDto: SendBarnUserDto) => {
    try {
      const { data } = await api.post('order/send-barn-user', sendBarnUserDto)
      return data
    } catch (error) {
      console.log(error)
      return { error_message: (error as AxiosError).message }
    }
  }
)
