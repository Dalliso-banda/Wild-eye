import Layout from "../layouts/MobileLayout";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import axios from "axios";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

export default function SignUp() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();

  // Watch the password field so we can compare it for the confirmation
  const password = watch("password");

  const onSubmit = async (data) => {
    try {
      const response = await axios.post("/api/user/register", data);
      console.log("Registration successful:", response.data);
      console.log("Creating Account for:", data);
    } catch (error) {
      console.error(
        "Registration failed:",
        error.response?.data || error.message,
      );
    }
    await new Promise((resolve) => setTimeout(resolve, 1500));
  };

  return (
    <Layout>
      <Container className="py-5">
        <div className="text-center mb-4">
          <h2 className="fw-bold">Create Account</h2>
          <p className="text-muted">Join Wild-Eye for real-time safety</p>
        </div>

        <Form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white p-4 rounded-4 shadow-sm border mx-auto"
          style={{ maxWidth: "450px" }}
        >
          {/* Full Name */}
          <Form.Group className="mb-3">
            <Form.Label>Full Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="John Doe"
              {...register("fullName", { required: "Full name is required" })}
              isInvalid={!!errors.fullName}
            />
            <Form.Control.Feedback type="invalid">
              {errors.fullName?.message}
            </Form.Control.Feedback>
          </Form.Group>

          {/* Email */}
          <Form.Group className="mb-3">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="email"
              placeholder="name@example.com"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              })}
              isInvalid={!!errors.email}
            />
            <Form.Control.Feedback type="invalid">
              {errors.email?.message}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control
              type="number"
              placeholder="0976557875"
              {...register("phone", {
                required: "Phone number is required",
                pattern: {
                  value: /^09\d{8}$/,
                  message: "Invalid phone number format",
                },
              })}
              isInvalid={!!errors.phone}
            />
            <Form.Control.Feedback type="invalid">
              {errors.phone?.message}
            </Form.Control.Feedback>
          </Form.Group>
          {/* Password */}
          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Minimum 8 characters"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Must be at least 8 characters",
                },
              })}
              isInvalid={!!errors.password}
            />
            <Form.Control.Feedback type="invalid">
              {errors.password?.message}
            </Form.Control.Feedback>
          </Form.Group>

          {/* Confirm Password */}
          <Form.Group className="mb-4">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Re-enter password"
              {...register("confirmPassword", {
                required: "Please confirm your password",
                validate: (value) =>
                  value === password || "Passwords do not match",
              })}
              isInvalid={!!errors.confirmPassword}
            />
            <Form.Control.Feedback type="invalid">
              {errors.confirmPassword?.message}
            </Form.Control.Feedback>
          </Form.Group>

          <Button
            variant="warning"
            type="submit"
            className="w-100 py-2 mb-3 rounded-pill"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Setting up account..." : "Sign Up"}
          </Button>

          <div className="text-center mt-3">
            <span className="text-muted small">Already have an account? </span>
            <Link to="/login" className="small text-decoration-none fw-bold">
              Log In
            </Link>
          </div>
        </Form>
      </Container>
    </Layout>
  );
}
