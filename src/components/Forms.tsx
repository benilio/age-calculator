import styles from '@/styles/Home.module.css'

export const Forms = () => {
	return (
		<form className={styles.form}>
			<div className={styles.form__field}>
				<label htmlFor='day'>Day</label>
				<input
					placeholder='DD'
					type='number'
					name='day'
					id='day'
				/>
			</div>

			<div className={styles.form__field}>
				<label htmlFor='month'>Month</label>
				<input
					placeholder='MM'
					type='number'
					name='month'
					id='month'
				/>
			</div>

			<div className={styles.form__field}>
				<label htmlFor='year'>Year</label>
				<input
					placeholder='YYYY'
					type='number'
					name='year'
					id='year'
				/>
			</div>
		</form>
	)
}
