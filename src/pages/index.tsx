import Head from 'next/head'
import { Poppins } from 'next/font/google'
import styles from '@/styles/Home.module.css'

import Image from 'next/image'

const poppins = Poppins({
	subsets: ['latin-ext'],
	weight: ['400', '700', '800', '900'],
	style: ['normal', 'italic'],
})

export default function Home() {
	return (
		<>
			<Head>
				<title>Age Calculator</title>
				<meta
					name='description'
					content='Age calculator app'
				/>
				<meta
					name='viewport'
					content='width=device-width, initial-scale=1'
				/>
				<link
					rel='icon'
					type='image/png'
					sizes='32x32'
					href='/favicon.png'
				/>
			</Head>
			<main className={`${styles.main} ${poppins.className}`}>
				<section className={styles.calculator}>
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
				</section>
				<div className={styles.attribution}>
					Challenge by{' '}
					<a
						href='https://www.frontendmentor.io?ref=challenge'
						target='_blank'
					>
						Frontend Mentor
					</a>
					. Coded by{' '}
					<a
						href='https://www.frontendmentor.io/profile/benilio'
						target='_blank'
					>
						Benicio Oliveira
					</a>
					.
				</div>
			</main>
		</>
	)
}
