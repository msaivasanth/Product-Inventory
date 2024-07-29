import { ReactNode, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export function TimeoutProvider({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  const location = useLocation();
  const timeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {

    if (exemptedRoutes.includes(location.pathname)) return ;

    const handleWindowEvents = () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        localStorage.removeItem('token');
        navigate("/login");
        toast.error("Session expired! Please login again.", {
          theme: "colored"
        });
      }, 600000); 
    };

    // Listen for specific window events to ensure the user is still active
    window.addEventListener("mousemove", handleWindowEvents);
    window.addEventListener("keydown", handleWindowEvents);
    window.addEventListener("click", handleWindowEvents);
    window.addEventListener("scroll", handleWindowEvents);

    // Trigger the initial timeout setup
    handleWindowEvents();

    // Cleanup function 
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      window.removeEventListener("mousemove", handleWindowEvents);
      window.removeEventListener("keydown", handleWindowEvents);
      window.removeEventListener("click", handleWindowEvents);
      window.removeEventListener("scroll", handleWindowEvents);
    };
  }, [location.pathname, navigate]);

  return children;
}
const exemptedRoutes = ["/404", "/sign-up", "/forgot-password", '/login'];