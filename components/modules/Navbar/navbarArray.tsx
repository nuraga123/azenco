import {
  AiOutlineHome,
  AiOutlineDatabase,
  AiOutlineFileText,
  AiOutlineHistory,
  AiOutlinePhone,
  AiOutlineShoppingCart,
} from 'react-icons/ai'
import { SiMicrosoftexcel } from 'react-icons/si'

interface INavbarElement {
  href: string
  title: string
  icon: JSX.Element
}

export const navbarArray: INavbarElement[] = [
  {
    href: '/my',
    title: 'Mənim Anbarım',
    icon: <AiOutlineHome />,
  },
  {
    href: '/barns',
    title: 'Anbarlar',
    icon: <AiOutlineDatabase />,
  },
  {
    href: '/orders',
    title: 'Sifarişlər',
    icon: <AiOutlineShoppingCart />,
  },
  {
    href: '/archive',
    title: 'Arxiv',
    icon: <AiOutlineHistory />,
  },
  {
    href: '/products',
    title: 'Materiallar',
    icon: <AiOutlineFileText />,
  },
  {
    href: '/contacts',
    title: 'Kontaktlar',
    icon: <AiOutlinePhone style={{ transform: 'rotate(90deg)' }} />,
  },
  {
    href: '/install-products-excel',
    title: 'Excel',
    icon: <SiMicrosoftexcel />,
  },
]
