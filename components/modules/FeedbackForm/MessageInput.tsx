import { IFeedbackInput } from '@/types/feedbackForm'
import styles from '@/styles/feedbackForm/index.module.scss'

const MessageInput = ({ register, errors, darkModeClass }: IFeedbackInput) => (
  <label className={`${styles.feedback_form__form__label} ${darkModeClass}`}>
    <textarea
      className={`${styles.feedback_form__form__textarea} ${darkModeClass}`}
      placeholder="Mesajınızı daxil edin ( 5-dən 300-ə qədər simvol arasında )"
      {...register('message', {
        required: 'Mesajınızı daxil edin !',
        minLength: 5,
        maxLength: 300,
      })}
    />
    {errors.message && (
      <span className={styles.error_alert}>{errors.message?.message}</span>
    )}
    {errors.message && errors.message.type === 'minLength' && (
      <span className={styles.error_alert}>
        Mesaj 5 simvoldan az olmamalıdır!
      </span>
    )}
    {errors.message && errors.message.type === 'maxLength' && (
      <span className={styles.error_alert}>
        Mesaj 300 simvoldan çox olmamalıdır !
      </span>
    )}
  </label>
)

export default MessageInput
