import { useRouter } from 'next/router'

import styles from '@/styles/modal/index.module.scss'

type ModalBtnProps = {
  selectedBarnId: number
  handleClose: () => void
}

type ActionBlockProps = {
  title: string
  buttons: {
    className: string
    text: string
    subtext?: string
    onClick: () => void
  }[]
}

const ActionBlock = ({ buttons, title }: ActionBlockProps) => (
  <div className={styles.content}>
    <h1 className={styles.title}>{title}</h1>
    <div className={styles.wrapper}>
      {buttons.map((button, index) => (
        <button
          key={index}
          className={button.className}
          onClick={button.onClick}
        >
          {button.text}
          <br />
          {button.subtext && (
            <>
              <br />
              <div className={styles.small_text}>{button.subtext}</div>
            </>
          )}
        </button>
      ))}
    </div>
  </div>
)

const ModalBtn = ({ selectedBarnId, handleClose }: ModalBtnProps) => {
  const router = useRouter()

  const navigation = (path: string) => {
    router.push(path)
  }

  return (
    <div className={styles.modal}>
      <div className={styles.wrapper__content}>
        <div className={styles.head}>
          <h2 className={styles.title}>Fəaliyyət seçin</h2>
          <button className={styles.close} onClick={handleClose}>
            X
          </button>
        </div>

        <div className={styles.context__btn}>
          {/* PLUS */}
          <ActionBlock
            buttons={[
              {
                className: styles.add,
                text: '"Azenco" anbarlardan göndərilən',
                subtext: '',
                onClick: () => navigation('/barns'),
              },
              {
                className: styles.order,
                text: 'Başqası tərəfindən göndərilən',
                subtext: '(Anbardar tərəfindən deyil !)',
                onClick: () => navigation(`/my/barn/add/${selectedBarnId}`),
              },
            ]}
            title={`Miqdarını artırmaq 📦 +`}
          />

          {/* MINUS */}
          <ActionBlock
            buttons={[
              {
                className: styles.transfer,
                text: 'Başqa "Azenco" anbara göndərmək',
                subtext: '',
                onClick: () =>
                  navigation(`/my/barn/transfer/${selectedBarnId}`),
              },
              {
                className: styles.reduce,
                text: `Başqasına göndərmək `,
                subtext: '(Anbardar deyil !)',
                onClick: () => navigation(`/my/barn/reduce/${selectedBarnId}`),
              },
            ]}
            title={'Miqdarını azaltmaq 📦 -'}
          />

          {/* DELETE */}
          <ActionBlock
            buttons={[
              {
                className: styles.edit,
                text: 'dəyişdirin ✏️',
                subtext: '',
                onClick: () => navigation(`/my/barn/edit/${selectedBarnId}`),
              },
              {
                className: styles.delete,
                text: 'Silinmə 🗑️',
                subtext: '',
                onClick: () => navigation(`/my/barn/delete/${selectedBarnId}`),
              },
            ]}
            title={''}
          />
        </div>
      </div>
    </div>
  )
}
export default ModalBtn
