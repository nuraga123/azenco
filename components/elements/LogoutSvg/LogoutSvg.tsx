import Image from 'next/image'
import Img from '@/public/img/logout.png'

const LogoutSvg = () => (
  <Image
    src={Img}
    alt="logout"
    width={30}
    height={25}
    style={{ marginLeft: '10px' }}
  />
)

export default LogoutSvg
