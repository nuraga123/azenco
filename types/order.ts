import { IBarnItem } from './barn'

export interface ITypeOrderBtns {
  type: 'clientUser' | 'barnUser'
  userSelectDate?: string
  barnUserMessage?: string
  barnLocationProduct?: string
  order: IOrderItem
}

export interface ISendModal {
  order: IOrderItem
  onClose: () => void
}

export interface IOrderTableItemProps extends ITypeOrderBtns {
  index: number
}

// Интерфейсы для запросов
export interface IOrderQuery {
  limit?: number
  offset?: number
}

export interface IMessageAndErrorMessage {
  message?: string
  error_message?: string
}

export interface IOrderResponce extends IMessageAndErrorMessage {
  order?: IOrderItem
}

export interface IOrdersResponce extends IMessageAndErrorMessage {
  orders: IOrderItem[]
}

export interface NewOrderDto {
  barnId: number
  clientId: number
  newStock: number
  usedStock: number
  brokenStock: number
  clientLocation: string
  clientMessage?: string
}

export interface ConfirmBarnUserDto {
  barnUserMessage: string
  orderId: number
  barnUsername: string
  barnUserId: number
  barnId: number
  userSelectDate: string
}

export interface IDeleteOrderFromClientDto {
  orderId: number
  clientId: number
  productId: number
  azencoCode: string
  productName: string
  clientUserName: string
}

export interface SendBarnUserDto {
  barnUserMessage?: string
  orderId: number
  barnUsername: string
  barnLocationProduct: string
  barnUserId: number
  barnId: number
  driverName: string
  carNumber: string
  userSelectedDate: string
  newStockSend: number
  usedStockSend: number
  brokenStockSend: number
  updatePrice: number
}

export interface IOtherOrder {
  barnUsername: string
  barnUserId: number
}

export type TStatusOrderType =
  // новый заказ
  | 'yeni_sifariş'

  // заказ отменен клиентом
  | 'müştəri_sifarişi_ləğv_etdi'

  // складчик принял заказ
  | 'anbardar_sifarişi_qəbul_etdi'

  // заказ отменен складским работником
  | 'sifariş_anbardar_tərəfindən_ləğv_edildi'

  // складской работник полностью отправил заказ клиенту
  | 'anbardar_tam_sifarişi_müştəriyə_göndərdi'

  // складской работник не отправил заказ клиенту
  | 'anbardar_tam_sifarişi_müştəriyə_göndərməyib'

  // заказ успешно доставлен
  | 'sifariş_uğurla_çatdırıldı'

  // заказ доставлен с потерями и повреждениями
  | 'sifariş_itki_və_ziyanla_çatdırıldı'

  // заказ доставлен в неисправном состоянии
  | 'sifariş_yararsız_çatdırıldı'

  // заказ доставлен с потерями
  | 'sifariş_itki_ilə_çatdırıldı'

  // заказ не доставлен
  | 'sifariş_çatdırılmadı'

export interface IOrderItem {
  id: number
  status: TStatusOrderType

  clientId: number
  clientUserName: string
  clientMessage: string
  clientLocation: string

  barnUsername: string
  barnUserId: number
  barnUserMessage: string
  barnId: number
  barnLocation: string

  productId: number
  productName: string
  azencoCode: string
  unit: string
  price: string

  newStock: string
  usedStock: string
  brokenStock: string
  totalStock: string
  lostNewStock: string
  lostUsedStock: string
  lostBrokenStock: string
  lostTotalStock: string
  totalPrice: string

  driverName: string
  carNumber: string

  info: string

  createdAt: string
  updatedAt: string
}

export interface IOrdersSuccess {
  orders: IOrderItem[] | undefined
  error_message: string | undefined
}

export interface IOrdersError {
  orders?: undefined
  error_message: string
}

export type IOrdersResponse = IOrdersSuccess | IOrdersError

export interface IOrders {
  orders?: IOrderItem[]
  error_message?: string
}

export interface IOrderBase {
  newStock: string
  usedStock: string
  brokenStock: string
  clientMessage: string
  clientLocation: string
  handleNewStockChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleUsedStockChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleBrokenStockChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleOrderSubmit: (e: React.FormEvent<HTMLFormElement>) => void
  handleCLientLocationChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleClientMessageChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  isDisabled: boolean
  spinner: boolean
  errorsMessageArr: string[]
}

export interface IOrderModal extends IOrderBase {
  currentBarn: IBarnItem
  toggleModal: boolean
  closeBtn: () => void
  barnUsername?: string
}
