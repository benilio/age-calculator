'use client';

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import dayjs from "dayjs";

import Image from "next/image";

import ArrowIconUrl from "@/assets/icon-arrow.svg";
import styles from "@/styles/Home.module.css";

// Check days in month
// https://stackoverflow.com/a/1433119
function daysInMonth(m: number, y: number) {
  // m is 0
  // indexed: 0-11

  // 28-29 => 1 Feb
  // 31 => 0 Jan, 2 Mar, 4 May, 6 Jul, 7 Aug, 9 Oct, 11 Dec
  // 30 => 3 Apr, 5 Jun, 8 Sep, 10 Nov

  switch (m) {
    // February has 28 days, or 29 days if it is a leap year
    case 1:
      return (y % 4 == 0 && y % 100) || y % 400 == 0 ? 29 : 28;

    // Months with 30 days
    case 3:
    case 5:
    case 8:
    case 10:
      return 30;

    // By default, months are 31 days long
    default:
      return 31;
  }
}

// Check if the date is valid
// https://stackoverflow.com/a/1433119
function isValid(d: number, m: number, y: number) {
  m = parseInt(m.toString(), 10) - 1;
  return m >= 0 && m < 12 && d > 0 && d <= daysInMonth(m, y);
}

// Form date schema with validation
const createDateSchema = z
  .object({
    day: z
      .number({
        required_error: "This field is required",
        invalid_type_error: "This field is required",
      })
      .int("Must be a valid day")
      .positive("Must be a valid day")
      .min(1, "Must be a valid day")
      .max(31, "Must be a valid day"),
    month: z
      .number({
        required_error: "This field is required",
        invalid_type_error: "This field is required",
      })
      .int("Must be a valid month")
      .positive("Must be a valid month")
      .min(1, "Must be a valid month")
      .max(12, "Must be a valid month"),
    year: z
      .number({
        required_error: "This field is required",
        invalid_type_error: "This field is required",
      })
      .int("Must be a valid year")
      .positive("Must be a valid year")
      .min(1, "Must be a valid year")
      .max(new Date().getFullYear(), "Must be in the past"),
  })
  .superRefine((data, ctx) => {
    const { day, month, year } = data;

    // Check for invalid calendar date (like 31/02)
    if (!isValid(day, month, year)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Must be a valid date",
        path: ["day"], // show error on day field
      });
    }

    // Check for future date (invalid)
    const inputDate = new Date(year, month - 1, day);
    const today = new Date();

    if (inputDate > today) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Must be in the past",
        path: ["year"], // show error on year field
      });
    }
  });

// Infer type of date inputs based on date schema
type CreateDateData = z.infer<typeof createDateSchema>;

export default function Home() {
  // Results holders
  const [days, setDays] = useState("--");
  const [months, setMonths] = useState("--");
  const [years, setYears] = useState("--");

  // Use react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateDateData>({
    resolver: zodResolver(createDateSchema),
    mode: "onBlur", // Run check when losing input focus
  });

  function animateValue(
    start: number,
    end: number,
    duration: number,
    setter: (value: string) => void,
  ) {
    if (start === end) {
      setter(end.toString());
      return;
    }

    const range = end - start;
    const increment = range > 0 ? 1 : -1;
    const stepTime = Math.abs(Math.floor(duration / Math.abs(range)));

    let current = start;

    const timer = setInterval(() => {
      current += increment;
      setter(current.toString());

      if (current === end) {
        clearInterval(timer);
      }
    }, stepTime);
  }

  function getDate(data: CreateDateData) {
    const { day, month, year } = data;

    let birthday = dayjs(new Date(year, month - 1, day));
    const today = dayjs();

    // Calculate full years
    const yearsDiff = today.diff(birthday, "year");
    birthday = birthday.add(yearsDiff, "year");

    // Calculate remaining months
    const monthsDiff = today.diff(birthday, "month");
    birthday = birthday.add(monthsDiff, "month");

    // Calculate remaining days
    const daysDiff = today.diff(birthday, "day");

    // Animate results
    animateValue(0, yearsDiff, 2000, setYears);
    animateValue(0, monthsDiff, 1000, setMonths);
    animateValue(0, daysDiff, 1500, setDays);
  }

  return (
      <main className={`${styles.main}`}>
        <section className={styles.calculator}>
          <form
            id="calcAgeForm"
            onSubmit={handleSubmit(getDate)}
            className={styles.form}
          >
            <div
              className={
                errors.day
                  ? `${styles.form__field} ${styles.form__field__error}`
                  : `${styles.form__field}`
              }
            >
              <label htmlFor="day">Day</label>
              <input
                placeholder="DD"
                type="text"
                inputMode="numeric"
                maxLength={2}
                id="day"
                className={
                  errors.day
                    ? `${styles.form__field__numeric} ${styles.form__field__numeric__error}`
                    : `${styles.form__field__numeric}`
                }
                {...register("day", { valueAsNumber: true })}
              />
              {errors.day && (
                <span className={styles.form__field__error}>
                  {errors.day.message}
                </span>
              )}
            </div>

            <div
              className={
                errors.month
                  ? `${styles.form__field} ${styles.form__field__error}`
                  : `${styles.form__field}`
              }
            >
              <label htmlFor="month">Month</label>
              <input
                placeholder="MM"
                type="text"
                inputMode="numeric"
                maxLength={2}
                id="month"
                className={
                  errors.month
                    ? `${styles.form__field__numeric} ${styles.form__field__numeric__error}`
                    : `${styles.form__field__numeric}`
                }
                {...register("month", { valueAsNumber: true })}
              />
              {errors.month && (
                <span className={styles.form__field__error}>
                  {errors.month.message}
                </span>
              )}
            </div>

            <div
              className={
                errors.year
                  ? `${styles.form__field} ${styles.form__field__error}`
                  : `${styles.form__field}`
              }
            >
              <label htmlFor="year">Year</label>
              <input
                placeholder="YYYY"
                type="text"
                inputMode="numeric"
                maxLength={4}
                id="year"
                className={
                  errors.year
                    ? `${styles.form__field__numeric} ${styles.form__field__numeric__error}`
                    : `${styles.form__field__numeric}`
                }
                {...register("year", { valueAsNumber: true })}
              />
              {errors.year && (
                <span className={styles.form__field__error}>
                  {errors.year.message}
                </span>
              )}
            </div>

            <div className={styles.spacer}>empty</div>
          </form>

          <div className={styles.divider}>
            <div className={`${styles.divider__bar} ${styles.left}`}></div>
            <div className={`${styles.divider__bar} ${styles.right}`}></div>
            <button type="submit" form="calcAgeForm" className={styles.button}>
              <Image
                src={ArrowIconUrl}
                alt="Arrow down"
                // width={46}
                // height={46}
              />
            </button>
          </div>
          <div className={styles.result}>
            <p>
              <span id="years" className={styles.result__numbers}>
                {years}
              </span>{" "}
              years
            </p>
            <p>
              <span id="months" className={styles.result__numbers}>
                {months}
              </span>{" "}
              months
            </p>
            <p>
              <span id="days" className={styles.result__numbers}>
                {days}
              </span>{" "}
              days
            </p>
          </div>
        </section>
        <div className={styles.attribution}>
          Challenge by{" "}
          <a href="https://www.frontendmentor.io?ref=challenge" target="_blank">
            Frontend Mentor
          </a>
          . Coded by{" "}
          <a
            href="https://www.frontendmentor.io/profile/benilio"
            target="_blank"
          >
            Benício Oliveira
          </a>
          .
        </div>
      </main>
  );
}
