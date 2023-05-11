import Head from 'next/head'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'

import Image from 'next/image'

// @ts-ignore
import ArrowIconUrl from '@/assets/icon-arrow.svg?url'
import styles from '@/styles/Home.module.css'

// Import duration from dayjs
dayjs.extend(duration)

// Check days in month
// https://stackoverflow.com/a/1433119
function daysInMonth(m: number, y: number) {
	// m is 0 indexed: 0-11
	switch (m) {
		case 1:
			return (y % 4 == 0 && y % 100) || y % 400 == 0 ? 29 : 28
		case 8:
		case 3:
		case 5:
		case 10:
			return 30
		default:
			return 31
	}
}

// Check if the date is valid
// https://stackoverflow.com/a/1433119
function isValid(d: number, m: number, y: number) {
	m = parseInt(m.toString(), 10) - 1
	return m >= 0 && m < 12 && d > 0 && d <= daysInMonth(m, y)
}

// Form date schema with validation
const createDateSchema = z
	.object({
		day: z
			.number({
				required_error: 'This field is required',
				invalid_type_error: 'This field is required',
			})
			.int('Must be a valid day')
			.positive('Must be a valid day')
			.min(1, 'Must be a valid day')
			.max(31, 'Must be a valid day'),
		month: z
			.number({
				required_error: 'This field is required',
				invalid_type_error: 'This field is required',
			})
			.int('Must be a valid month')
			.positive('Must be a valid month')
			.min(1, 'Must be a valid month')
			.max(12, 'Must be a valid month'),
		year: z
			.number({
				required_error: 'This field is required',
				invalid_type_error: 'This field is required',
			})
			.int('Must be a valid year')
			.positive('Must be a valid year')
			.min(1, 'Must be a valid year')
			.max(new Date().getFullYear(), 'Must be in the past'),
	})
	.refine((data) => isValid(data.day, data.month, data.year) === true, {
		message: 'Must be a valid date',
		path: ['day'],
	})
	.refine((data) => isValid(data.day, data.month, data.year) === true, {
		message: ' ',
		path: ['month'],
	})
	.refine((data) => isValid(data.day, data.month, data.year) === true, {
		message: ' ',
		path: ['year'],
	})

// Infer type of date inputs based on date schema
type CreateDateData = z.infer<typeof createDateSchema>

export default function Home() {
	// Results holders
	const [days, setDays] = useState('--')
	const [months, setMonths] = useState('--')
	const [years, setYears] = useState('--')

	// Use react-hook-form
	const {
		register,
		getValues,
		handleSubmit,
		formState: { errors },
	} = useForm<CreateDateData>({
		resolver: zodResolver(createDateSchema),
	})

	// Form onSubmit response
	function getDate() {
		// Get values from form and turn into valid date
		const day = getValues('day')
		const month = getValues('month') - 1
		const year = getValues('year')
		const birthday = new Date(year, month, day)

		// Get current day (simple)
		const currentDay = new Date()
		const today = new Date(
			currentDay.getFullYear(),
			currentDay.getMonth(),
			currentDay.getDate()
		)

		// Get the difference between today date and set date
		const dateDiff = [
			dayjs.duration(dayjs(today).diff(dayjs(birthday))).days(),
			dayjs.duration(dayjs(today).diff(dayjs(birthday))).months(),
			dayjs.duration(dayjs(today).diff(dayjs(birthday))).years(),
		]

		// Animate results
		// https://stackoverflow.com/a/16994725
		let daysDiff: number = 0
		let monthsDiff: number = 0
		let yearsDiff: number = 0

		const dateDiffAni = (
			start: number,
			end: number,
			duration: number,
			target: any
		) => {
			if (start === end) return
			let range = end - start
			let current = start
			let increment = end > start ? 1 : -1
			let stepTime = Math.abs(Math.floor(duration / range))
			let timer = setInterval(function () {
				current += increment
				target(current.toString())
				if (current == end) {
					clearInterval(timer)
				}
			}, stepTime)
		}

		// Print results
		dateDiffAni(daysDiff, dateDiff[0], 2000, setDays)
		dateDiffAni(monthsDiff, dateDiff[1], 1000, setMonths)
		dateDiffAni(yearsDiff, dateDiff[2], 3000, setYears)

		return
	}

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
			<main className={`${styles.main}`}>
				<section className={styles.calculator}>
					<form
						id='calcAgeForm'
						onSubmit={handleSubmit(getDate)}
						className={styles.form}
					>
						<div
							className={
								errors.day
									? `${styles.form__field} ${styles.error}`
									: `${styles.form__field}`
							}
						>
							<label htmlFor='day'>Day</label>
							<input
								placeholder='DD'
								type='number'
								id='day'
								{...register('day', { valueAsNumber: true })}
							/>
							{errors.day && (
								<span className={styles.error}>{errors.day.message}</span>
							)}
						</div>

						<div
							className={
								errors.month
									? `${styles.form__field} ${styles.error}`
									: `${styles.form__field}`
							}
						>
							<label htmlFor='month'>Month</label>
							<input
								placeholder='MM'
								type='number'
								id='month'
								{...register('month', { valueAsNumber: true })}
							/>
							{errors.month && (
								<span className={styles.error}>{errors.month.message}</span>
							)}
						</div>

						<div
							className={
								errors.year
									? `${styles.form__field} ${styles.error}`
									: `${styles.form__field}`
							}
						>
							<label htmlFor='year'>Year</label>
							<input
								placeholder='YYYY'
								type='number'
								id='year'
								{...register('year', { valueAsNumber: true })}
							/>
							{errors.year && (
								<span className={styles.error}>{errors.year.message}</span>
							)}
						</div>

						<div className={styles.spacer}>empty</div>
					</form>

					<div className={styles.divider}>
						<div className={`${styles.divider__bar} ${styles.left}`}></div>
						<div className={`${styles.divider__bar} ${styles.right}`}></div>
						<button
							type='submit'
							form='calcAgeForm'
							className={styles.button}
						>
							<Image
								src={ArrowIconUrl}
								alt='Arrow down'
								priority
							/>
						</button>
					</div>
					<div className={styles.result}>
						<p>
							<span
								id='years'
								className={styles.result__numbers}
							>
								{years}
							</span>{' '}
							years
						</p>
						<p>
							<span
								id='months'
								className={styles.result__numbers}
							>
								{months}
							</span>{' '}
							months
						</p>
						<p>
							<span
								id='days'
								className={styles.result__numbers}
							>
								{days}
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
						Benício Oliveira
					</a>
					.
				</div>
			</main>
		</>
	)
}
