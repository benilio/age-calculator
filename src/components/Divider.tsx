import Image from 'next/image'
import styles from '@/styles/Home.module.css'

export const Divider = () => {
	return (
		<div className={styles.divider}>
			<div className={styles.divider__bar}></div>
			<div className={styles.divider__bar}></div>
			<div className={styles.button}>
				<Image
					src='/icon-arrow.svg'
					alt='icon arrow'
					width={46}
					height={46}
					priority
				/>
			</div>
		</div>
	)
}
