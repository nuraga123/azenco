import {
  AiOutlineHome,
  AiOutlineDatabase,
  AiOutlineFileText,
  AiOutlineHistory,
  AiOutlinePhone,
} from 'react-icons/ai'

interface INavbarElement {
  href: string
  title: string
  icon: JSX.Element
}

export const navbarArray: INavbarElement[] = [
  {
    href: '/anbar/my',
    title: 'Mənim Anbarım',
    icon: <AiOutlineHome />,
  },
  {
    href: '/products',
    title: 'Materiallar',
    icon: <AiOutlineFileText />,
  },
  {
    href: '/anbar',
    title: 'Anbarlar',
    icon: <AiOutlineDatabase />,
  },
  {
    href: '/history',
    title: 'Arxiv',
    icon: <AiOutlineHistory />,
  },
  {
    href: '/contacts',
    title: 'Kontaktlar',
    icon: <AiOutlinePhone style={{ transform: 'rotate(90deg)' }} />,
  },
]
