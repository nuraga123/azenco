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
    href: '/products',
    title: 'Materiallar',
    icon: <AiOutlineFileText />,
  },
  {
    href: '/barns',
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
  {
    href: '/form__string',
    title: 'form__string',
    icon: <AiOutlineFieldString />,
  },
]
