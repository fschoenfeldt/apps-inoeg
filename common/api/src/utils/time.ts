// Kiebitz - Privacy-Friendly Appointments
// Copyright (C) 2021-2021 The Kiebitz Authors
// README.md contains license information.

export function getMonday(d: string | Date | number) {
  d = new Date(d);

  const day = d.getDay();
  const diff = d.getDate() - day + (day == 0 ? -6 : 1); // adjust when day is sunday

  return new Date(d.setDate(diff));
}

// https://stackoverflow.com/questions/23593052/format-javascript-date-as-yyyy-mm-dd
export function formatDate(date: string | Date | number) {
  try {
    return new Date(date).toISOString().slice(0, 10);
  } catch (error) {
    console.error(error);

    return undefined;
  }
}

// https://stackoverflow.com/questions/23593052/format-javascript-date-as-yyyy-mm-dd
export function formatTime(date: string | Date | number) {
  try {
    return new Date(date).toISOString().slice(11, 16);
  } catch (error) {
    console.error(error);

    return undefined;
  }
}

export function formatDuration(minutes: number) {
  if (minutes < 60) {
    return `${minutes} Minuten`;
  }

  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  if (remainingMinutes === 0) {
    return `${hours} Stunden`;
  }

  return `${hours} Stunden ${remainingMinutes} Minuten`;
}
