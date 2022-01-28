const today = new Date();

//* Query the current date and convert it to a special format.
export const currentDate = () => {
  let year = today.getFullYear();
  let month = today.getMonth() + 1;
  let day = today.getDate();

  if (month < 10) month = `0${month}`;
  if (day < 10) day = `0${day}`;

  return [year, month, day].join("-");
};

//* Query the current time and convert it to a special format.
export const currentTime = () => {
  let hours = today.getHours();
  let minutes = today.getMinutes();

  let suffix = hours >= 12 ? "PM" : "AM";
  hours = ((hours + 11) % 12) + 1;

  if (hours < 10) hours = `0${hours}`;
  if (minutes < 10) minutes = `0${minutes}`;
  return [hours, minutes].join(":") + " " + suffix;
};
