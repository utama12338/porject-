import dayjs from "dayjs";

export function calculateAge(dob, registerDate){
  // Split the date string into year and month
  const [year, month, day] = (dob).split("-");

  // Get the current year and month
  const registerYear = dayjs(registerDate).format("YYYY");
  const registerMonth = dayjs(registerDate).format("MM");
  const registerDay = dayjs(registerDate).format("DD");

  // Calculate the difference in years and months
  let ageYears = Number(registerYear) - Number(year);
  let ageMonths = Number(registerMonth) - Number(month);
  let ageDay = Number(registerDay) - Number(day);

   // If birth month is greater than the current month, or if the current month is the same
    // but the day of birth is greater, subtract a year from the age
    if (ageMonths < 0 || (ageMonths === 0 && ageDay < 0)) {
      ageYears--;
      ageMonths += 12;
  }

  // If days is negative, adjust the months
  if (ageDay < 0) {
      ageMonths--;
      // Get the number of days in the previous month
      const lastMonth = dayjs(registerDate);
      ageDay += lastMonth.get('date')

  }

  const age = (ageYears ? ageYears.toString() : "0") + "." + 
  (ageMonths ? ageMonths.toString() : "0");

  // Return the age in years and months as a string
  return age;
}

export default calculateAge;