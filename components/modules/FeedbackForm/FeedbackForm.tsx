import { MutableRefObject, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { useStore } from 'effector-react'
import emailjs from '@emailjs/browser'

import { $mode } from '@/context/mode'
import { FeedbackInputs } from '@/types/feedbackForm'
import NameInput from './NameInput'
import PhoneInput from './PhoneInput'
import EmailInput from './EmailInput'
import MessageInput from './MessageInput'

import styles from '@/styles/feedbackForm/index.module.scss'
import spinnerStyles from '@/styles/spinner/index.module.scss'

const FeedbackForm = () => {
  const mode = useStore($mode)
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FeedbackInputs>()

  const [spinner, setSpinner] = useState(false)
  const formRef = useRef() as MutableRefObject<HTMLFormElement>

  const submitForm = (data: FeedbackInputs) => {
    setSpinner(true)

    emailjs
      .sendForm(
        'service_r4cs4ki',
        'template_wbq8mmw',
        formRef.current,
        'mrmG9mHgTFjAwz_3f'
      )
      .then((result) => {
        console.log(data)
        setSpinner(false)
        toast.success(`Сообщение отравление ! ${result.status}`)
      })
      .catch((error) => {
        toast.error((error as Error).message)
      })

    formRef.current.reset()
  }

  return (
    <div className={`${styles.feedback_form} ${darkModeClass}`}>
      <h3 className={`${styles.feedback_form__title} ${darkModeClass}`}>
        Rəy Forması
      </h3>
      <form
        ref={formRef}
        className={styles.feedback_form__form}
        onSubmit={handleSubmit(submitForm)}
      >
        <NameInput
          register={register}
          errors={errors}
          darkModeClass={darkModeClass}
        />

        <PhoneInput
          register={register}
          errors={errors}
          darkModeClass={darkModeClass}
        />

        <EmailInput
          register={register}
          errors={errors}
          darkModeClass={darkModeClass}
        />

        <MessageInput
          register={register}
          errors={errors}
          darkModeClass={darkModeClass}
        />

        <div className={styles.feedback_form__form__btn}>
          <button>
            {spinner ? (
              <span
                className={spinnerStyles.spinner}
                style={{ top: '6px', left: '47%' }}
              />
            ) : (
              'Отправить сообщение'
            )}
          </button>
        </div>
      </form>
    </div>
  )
}

export default FeedbackForm
