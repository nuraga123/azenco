import { useForm, Controller } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import styles from '@/styles/barn/form/index.module.scss'

const schema = yup.object().shape({
  barnId: yup.number().required('Barn ID is required'),
  movementType: yup.string().required('Movement Type is required'),
  userSelectedDate: yup
    .date()
    .required('Date is required')
    .typeError('Invalid date format'),
  fromLocation: yup.string().required('From Location is required'),
  toLocation: yup.string().required('To Location is required'),
  newStock: yup
    .number()
    .required('New Stock is required')
    .min(0, 'Cannot be negative'),
  usedStock: yup
    .number()
    .required('Used Stock is required')
    .min(0, 'Cannot be negative'),
  brokenStock: yup
    .number()
    .required('Broken Stock is required')
    .min(0, 'Cannot be negative'),
})

const BarnForm = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })

  const onSubmit = (data) => {
    console.log(data)
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.form_group}>
        <label />
      </div>

      <div className={styles.form_group}>
        <label>Movement Type</label>
        <Controller
          name="movementType"
          control={control}
          render={({ field }) => <input type="text" {...field} />}
        />
        {errors.movementType && (
          <p className={styles.error}>{errors.movementType.message}</p>
        )}
      </div>

      <div className={styles.form_group}>
        <label>Date</label>
        <Controller
          name="userSelectedDate"
          control={control}
          render={({ field }) => <input type="date" {...field} />}
        />
        {errors.userSelectedDate && (
          <p className={styles.error}>{errors.userSelectedDate.message}</p>
        )}
      </div>

      <div className={styles.form_group}>
        <label>From Location</label>
        <Controller
          name="fromLocation"
          control={control}
          render={({ field }) => <input type="text" {...field} />}
        />
        {errors.fromLocation && (
          <p className={styles.error}>{errors.fromLocation.message}</p>
        )}
      </div>

      <div className={styles.form_group}>
        <label>To Location</label>
        <Controller
          name="toLocation"
          control={control}
          render={({ field }) => <input type="text" {...field} />}
        />
        {errors.toLocation && (
          <p className={styles.error}>{errors.toLocation.message}</p>
        )}
      </div>

      <div className={styles.form_group}>
        <label>New Stock</label>
        <Controller
          name="newStock"
          control={control}
          render={({ field }) => <input type="number" {...field} />}
        />
        {errors.newStock && (
          <p className={styles.error}>{errors.newStock.message}</p>
        )}
      </div>

      <div className={styles.form_group}>
        <label>Used Stock</label>
        <Controller
          name="usedStock"
          control={control}
          render={({ field }) => <input type="number" {...field} />}
        />
        {errors.usedStock && (
          <p className={styles.error}>{errors.usedStock.message}</p>
        )}
      </div>

      <div className={styles.form_group}>
        <label>Broken Stock</label>
        <Controller
          name="brokenStock"
          control={control}
          render={({ field }) => <input type="number" {...field} />}
        />
        {errors.brokenStock && (
          <p className={styles.error}>{errors.brokenStock.message}</p>
        )}
      </div>

      <button type="submit" className={styles.submit_button}>
        Submit
      </button>
    </form>
  )
}

export default BarnForm
