import styles from '@/styles/Home.module.css'

export const Results = () => {
	return (
		<div className={styles.result}>
			<p>
				<span
					id='years'
					className={styles.result__numbers}
				>
					--
				</span>{' '}
				years
			</p>
			<p>
				<span
					id='months'
					className={styles.result__numbers}
				>
					--
				</span>{' '}
				months
			</p>
			<p>
				<span
					id='days'
					className={styles.result__numbers}
				>
					--
				</span>{' '}
				days
			</p>
		</div>
	)
}
