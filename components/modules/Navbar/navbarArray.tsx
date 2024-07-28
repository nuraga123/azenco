import {
  AiOutlineHome,
  AiOutlineDatabase,
  AiOutlineFileText,
  AiOutlineHistory,
  AiOutlinePhone,
  AiOutlineFieldString,
} from 'react-icons/ai'

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
    title: 'install-products-excel',
    icon: <AiOutlineFieldString />,
  },
]
