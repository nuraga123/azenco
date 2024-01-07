import { useRouter } from 'next/router'
import { forwardRef } from 'react'
import { useStore } from 'effector-react'
import { AnimatePresence, motion } from 'framer-motion'

import { logoutFx } from '@/app/api/auth'
import { IWrappedComponentProps } from '@/types/common'
import { $mode } from '@/context/mode'
import { $user } from '@/context/user'
import ProfileSvg from '@/components/elements/ProfileSvg/ProfileSvg'
import LogoutSvg from '@/components/elements/LogoutSvg/LogoutSvg'
import { withClickOutside } from '@/utils/withClickOutside'
import { getLocalStorageUser, removeLocalStorageUser } from '@/localStorageUser'

import styles from '@/styles/profileDropDown/index.module.scss'

const ProfileDropDown = forwardRef<HTMLDivElement, IWrappedComponentProps>(
  ({ open, setOpen }, ref) => {
    const localUserId = getLocalStorageUser().userId
    const mode = useStore($mode)
    const user = useStore($user)
    const router = useRouter()
    const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''

    const toggleProfileDropDown = () => setOpen(!open)

    const handleLogout = async () => {
      removeLocalStorageUser()
      router.push('/login')
      await logoutFx('/users/logout')
    }

    return (
      <div className={styles.profile} ref={ref}>
        <button className={styles.profile__btn} onClick={toggleProfileDropDown}>
          <span className={styles.profile__span}>
            <ProfileSvg />
          </span>
        </button>
        <AnimatePresence>
          {open && (
            <motion.ul
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              className={`${styles.profile__dropdown} ${darkModeClass}`}
              style={{ transformOrigin: 'right top' }}
            >
              <li className={styles.profile__dropdown__user}>
                <div>
                  {'User ID: '}
                  <span
                    className={`${styles.profile__dropdown__username} ${darkModeClass}`}
                  >
                    {user.userId || localUserId}
                  </span>
                </div>
                <div>
                  {'Login: '}
                  <span
                    className={`${styles.profile__dropdown__username} ${darkModeClass}`}
                  >
                    {user.username}
                  </span>
                </div>
                <div>
                  {'Email: '}
                  <span
                    className={`${styles.profile__dropdown__email} ${darkModeClass}`}
                  >
                    {user.email}
                  </span>
                </div>
              </li>
              <li className={styles.profile__dropdown__item}>
                <button className={styles.profile__dropdown__item__btn}>
                  <span
                    className={`${styles.profile__dropdown__svg} ${darkModeClass}`}
                  >
                    <LogoutSvg />
                  </span>
                  <span
                    className={`${styles.profile__dropdown__item__text} ${darkModeClass}`}
                    onClick={handleLogout}
                  >
                    {'Ç I X I Ş'}
                  </span>
                </button>
              </li>
            </motion.ul>
          )}
        </AnimatePresence>
      </div>
    )
  }
)

ProfileDropDown.displayName = 'ProfileDropDown'

export default withClickOutside(ProfileDropDown)
