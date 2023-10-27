import { useMediaQuery } from '@/hooks/useMediaQuery'

const CatalogFiltersDesktop = () => {
  const isMobile = useMediaQuery(820)

  return <>{isMobile ? <div /> : <div />}</>
}

export default CatalogFiltersDesktop
