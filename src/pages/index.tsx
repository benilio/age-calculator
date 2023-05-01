import Head from 'next/head'
import { Poppins } from 'next/font/google'
import styles from '@/styles/Home.module.css'

import { Forms } from '@/components/Forms'
import { Divider } from '@/components/Divider'
import { Results } from '@/components/Results'
import { Attribution } from '@/components/Attribution'

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
					<Forms />
					<Divider />
					<Results />
				</section>
				<Attribution />
			</main>
		</>
	)
}
