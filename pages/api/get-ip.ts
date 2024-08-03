import type { NextApiRequest, NextApiResponse } from 'next'
import * as os from 'os'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const interfaces = os.networkInterfaces()

  // Получаем интерфейс "Ethernet"
  const interfaceName = 'Ethernet'
  const networkInterface = interfaces[interfaceName]

  if (networkInterface) {
    // Ищем IPv4-адрес
    const ipv4Address = networkInterface.find(
      (addr) => addr.family === 'IPv4' && !addr.internal
    )

    if (ipv4Address) {
      res.status(200).json({ ip: ipv4Address.address })
    } else {
      res
        .status(404)
        .json({ error: 'IPv4-адрес не найден для интерфейса ' + interfaceName })
    }
  } else {
    res.status(404).json({ error: 'Интерфейс ' + interfaceName + ' не найден' })
  }
}
