// Kiebitz - Privacy-Friendly Appointments
// Copyright (C) 2021-2021 The Kiebitz Authors
// README.md contains license information.

import type { Vaccine } from "@kiebitz-oss/config";
import dayjs from "dayjs";
import { providers } from "../fixtures/providers";
import type { Appointment, Slot } from "../types";
// import { randomBytes } from "./crypto";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const randomBytes = (length = 0): string => Math.random().toString();

export const createSlot = (open = true): Slot => {
  return {
    id: randomBytes(32), // where the user can submit his confirmation
    open,
    status: randomBytes(32), // where the user can get the appointment status
    cancel: randomBytes(32), // where the user can cancel his confirmation
  };
};

export const createSlots = (number = 10) => {
  return Array.from(Array(number)).map(createSlot);
};

export class AppointmentItem {
  public appointment: Appointment;
  public startDate: Date;
  public endDate: Date;
  public overlapsWith: AppointmentItem[] = [];
  public maxOverlap = 0;
  public index = 0;
  public startsHere = false;

  constructor(appointment: Appointment) {
    this.appointment = appointment;
    this.startDate = this.appointment.date;
    this.endDate = new Date(
      this.appointment.date.getTime() +
        1000 * 60 * Math.max(0, appointment.duration)
    );
  }
}

export class AppointmentSet implements Iterable<AppointmentItem> {
  public appointmentItems: AppointmentItem[];

  public static createAppointmentSet(
    startAt: Date,
    endAt: Date,
    interval: number,
    lanes: number,
    vaccine: Vaccine
  ) {
    if (startAt > endAt) {
      throw new Error("Can't start set before it's end.");
    }

    if (startAt == endAt) {
      throw new Error("Start and end can't be equal.");
    }

    let startDayjs = dayjs(startAt);
    const endDayjs = dayjs(endAt);
    const appointments: Appointment[] = [];

    do {
      appointments.push({
        id: randomBytes(30),
        date: startDayjs.toDate(),
        duration: interval,
        slots: createSlots(lanes),
        bookings: [],
        vaccine: vaccine,
        modified: true,
        provider: providers[0],
      } as unknown as Appointment);

      startDayjs = startDayjs.add(interval, "minute");
    } while (startDayjs < endDayjs);

    return new AppointmentSet(appointments);
  }

  constructor(appointments: Appointment[]) {
    let activeAppointmentItems: AppointmentItem[] = [];

    this.appointmentItems = appointments
      // filter appointments without slots
      // .filter((app) => app.slots.length > 0)
      // sort by startDate
      .sort((a, b) => a.date.getTime() - b.date.getTime())
      // map to AppointmentItem
      .map((appointment, i) => {
        const appointmentItem =
          appointment instanceof AppointmentItem
            ? appointment
            : new AppointmentItem(appointment);

        appointmentItem.index = i;

        activeAppointmentItems = activeAppointmentItems.filter(
          (activeAppointmentItem) =>
            activeAppointmentItem.endDate > appointmentItem.startDate
        );

        appointmentItem.overlapsWith = [...activeAppointmentItems];

        for (const overlappingAppointmentItem of appointmentItem.overlapsWith) {
          overlappingAppointmentItem.overlapsWith.push(appointmentItem);
        }

        activeAppointmentItems.push(appointmentItem);

        const nextAppointmentItIndex = activeAppointmentItems.length - 1;

        for (const appointmentItem of activeAppointmentItems) {
          if (nextAppointmentItIndex > appointmentItem.maxOverlap) {
            appointmentItem.maxOverlap = nextAppointmentItIndex;
          }
        }

        return appointmentItem;
      });
  }

  public filterBetweenDates(
    from: Date,
    to: Date,
    appointmentItems?: AppointmentItem[]
  ) {
    return (appointmentItems || this.appointmentItems).filter(
      (appointmentItem) => {
        return (
          appointmentItem.startDate > from && appointmentItem.endDate < to
          // && appointmentItem.appointment.slots.length >= 0
        );
      }
    );
  }

  public filterRelevantAppointmentItems(
    from: Date,
    to: Date,
    appointmentItems?: AppointmentItem[]
  ) {
    return (appointmentItems || this.appointmentItems).filter(
      (appointmentItem) => {
        // starts in interval
        if (
          appointmentItem.startDate >= from &&
          appointmentItem.startDate < to
        ) {
          appointmentItem.startsHere = true;
          return true;
        }

        // ends in interval
        if (appointmentItem.endDate > from && appointmentItem.endDate <= to) {
          appointmentItem.startsHere = false;
          return true;
        }

        // is in interval
        if (
          appointmentItem.startDate <= from &&
          appointmentItem.endDate >= to
        ) {
          appointmentItem.startsHere = false;
          return true;
        }

        return false;
      }
    );
  }

  [Symbol.iterator]() {
    // Use a new index for each iterator. This makes multiple
    // iterations over the iterable safe for non-trivial cases,
    // such as use of break or nested looping over the same iterable.
    let index = 0;

    return {
      next: () => {
        if (index < this.appointmentItems.length) {
          return {
            value: this.appointmentItems[index++],
            done: false,
          };
        }

        return { value: this.appointmentItems[index++], done: true };
      },
    };
  }
}
