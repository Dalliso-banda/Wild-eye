import Layout from '../layouts/MobileLayout';
import { Container, Form, Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    // This is where you'd call your Next.js/Node.js API
    console.log("Logging in...", data);
    await new Promise((resolve) => setTimeout(resolve, 1000));
  };

  return (
    <Layout>
      <Container className="py-5">
        <div className="text-center mb-4">
          <h2 className="fw-bold">Welcome Back</h2>
          <p className="text-muted">Securely sign in to Wild-Eye</p>
        </div>

        <Form 
          onSubmit={handleSubmit(onSubmit)} 
          className="bg-white p-4 rounded-4 shadow-sm border mx-auto" 
          style={{ maxWidth: '400px' }}
        >
          {/* Email Field */}
          <Form.Group className="mb-3">
            <Form.Label className="small fw-semibold">Email Address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              {...register("email", { 
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address"
                }
              })}
              isInvalid={!!errors.email}
            />
            <Form.Control.Feedback type="invalid">
              {errors.email?.message}
            </Form.Control.Feedback>
          </Form.Group>

          {/* Password Field */}
          <Form.Group className="mb-2">
            <Form.Label className="small fw-semibold">Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              {...register("password", { required: "Password is required", minLength: { value: 8, message: "Password must be at least 8 characters" } })}
              isInvalid={!!errors.password}
            />
            <Form.Control.Feedback type="invalid">
              {errors.password?.message}
            </Form.Control.Feedback>
          </Form.Group>



          <Button 
            variant="warning" 
            type="submit" 
            className="w-100 py-2 rounded-pill fw-bold"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Signing in...' : 'Sign In'}
          </Button>

          <div className="text-center mt-4">
            <span className="text-muted small">Don't have an account? </span>
            <Link to="/register" className="small text-decoration-none fw-bold">Sign Up</Link>
          </div>
        </Form>
      </Container>
    </Layout>
  );
}