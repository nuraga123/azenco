import SignUpForm from '@/components/modules/AuthPage/SignUpForm'
import SignInForm from '@/components/modules/AuthPage/SignInForm'

import styles from '@/styles/auth/index.module.scss'

const AuthPage = ({ isLogin }: { isLogin: boolean }) => (
  <div className={styles.main}>{isLogin ? <SignInForm /> : <SignUpForm />}</div>
)

export default AuthPage
