const BACK_URL = 'http://localhost:5001/';
const FRONT_URL = 'http://localhost:3000/';

// Log in user
export const login = async (formData) => {
    try {
      const response = await fetch(`${BACK_URL}login`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Login failed');
      }
  
      const userData = await response.json();
      localStorage.setItem('first_name', userData.first_name);
      localStorage.setItem('last_name', userData.last_name);
      localStorage.setItem('username', userData.username);
      localStorage.setItem('email', userData.email);
      
      return userData;
  
    } catch (error) {
      throw error;
    }
  };
  
  // Logout logged in user
  export const Logout = async () => {
    try {
      const response = await fetch(`${BACK_URL}logout`, {
        method: 'POST',
        credentials: 'include',
      });
  
      if (response.ok) {
        window.location.href = `${FRONT_URL}`; // route user to landing page on logout
      } else {
        console.error('Logout failed.');
      }
    } catch (error) {
      console.error('An error occurred while logging out:', error);
    }
  };

  // Check login status for debugging
export const checkLoginStatus = async () => {
    try {
      const response = await fetch(`${BACK_URL}login_status`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        const data = await response.json();
        if (data.logged_in) {
          console.log("You are logged in as user ID:", data.user_id);
        } else {
          console.log("You are not logged in.");
        }
      } else {
        console.log("Failed to check login status. Status code:", response.status);
      }
    } catch (error) {
      console.error("Error checking login status:", error);
    }
  };

  export const register = async (formData) => {
    try {
        // Adjusting formData to match backend expectations
        const adjustedFormData = {
            username: formData.username,
            password: formData.password,
        };
  
        const response = await fetch(`${BACK_URL}register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(adjustedFormData), // Use adjustedFormData
        });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Registration failed');
      }
  
        // Optional: Display a success message or notification before redirecting
        alert('Registration successful! Redirecting to login...'); // Optional alert
  
        window.location.href = `${FRONT_URL}login`; // Route user to login on registration
    } catch (error) {
      throw error;
    }
  };