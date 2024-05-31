const z = require("zod");

const signupSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .trim()
    .min(1, { message: "Email has to be filled." })
    .email({ message: "Invalid email address" }),
  firstname: z
    .string({ required_error: "First name is required" })
    .trim()
    .min(1, { message: "Firstname has to be filled" }),
  surname: z
    .string({ required_error: "Surname is required" })
    .trim()
    .min(1, { message: "Surname has to be filled" }),
  password: z
    .string({ required_error: "Password is required" })
    .trim()
    .min(6, { message: "Password must contain at least 6 characters" }),
});

const signinSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .trim()
    .min(1, { message: "Email has to be filled." })
    .email({ message: "Invalid email address" }),
  password: z
    .string({ required_error: "Password is required" })
    .trim()
    .min(1, { message: "Password has to be filled." }),
});

module.exports = { signupSchema, signinSchema };
