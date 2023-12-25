import { IFeedbackInput } from '@/types/feedbackForm'
import styles from '@/styles/feedbackForm/index.module.scss'

const NameInput = ({ register, errors, darkModeClass }: IFeedbackInput) => {
  console.log()
  return (
    <label className={`${styles.feedback_form__form__label} ${darkModeClass}`}>
      <span>Adınız və soyadınız</span>
      <input
        className={styles.feedback_form__form__input}
        type="text"
        placeholder="Ferid Quliyev"
        {...register('name', {
          required: 'Введите Имя !',
          pattern: {
            value: /^[а-яА-Яa-zA-ZёЁ]*$/,
            message: 'недопустимое значение',
          },
          minLength: 2,
          maxLength: 30,
        })}
      />
      {errors.name && (
        <span className={styles.error_alert}>{errors.name?.message}</span>
      )}

      {errors.name && errors.name.type === 'minLength' && (
        <span className={styles.error_alert}>минимум 2 символа</span>
      )}

      {errors.name && errors.name.type === 'maxLength' && (
        <span className={styles.error_alert}>не более 15 символов!</span>
      )}
    </label>
  )
}

export default NameInput
