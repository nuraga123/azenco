import Link from 'next/link'

const HelpUser = () => (
  <div>
    <Link href={'/help'} passHref legacyBehavior>
      <a>
        <h1>əlaqə saxlayın</h1>
      </a>
    </Link>
  </div>
)

export default HelpUser
