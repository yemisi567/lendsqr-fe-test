
export const isEmailValid = (email: string | null) => {
    if (email) {
      const trimmedEmail = email && email.trim();
      return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
        trimmedEmail
      );
    }
  };

export const isPasswordValid = (password: string | null) =>
    password && password.length >= 6;

export const formatDate = (date: string | Date, options?: Intl.DateTimeFormatOptions) => {
  const parsedDate = new Date(date);
  
  // Check if the date is valid
  if (isNaN(parsedDate.getTime())) {
    console.error("Invalid date:", date);
    return "Invalid Date";
  }

  return parsedDate.toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true, 
    ...options, 
  });
};

