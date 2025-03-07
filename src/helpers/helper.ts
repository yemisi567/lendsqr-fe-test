
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