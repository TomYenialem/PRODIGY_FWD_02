const api_url = import.meta.env.VITE_API_URL;

// A function to send the login request to the server
const logIn = async (formData) => {
  try {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    };
    console.log("About to send request");
    // console.log(requestOptions.body);
    const response = await fetch(
      `${api_url}/api/employee/login`,
      requestOptions
    );
    return response.json();
  } catch (error) {
    console.log("Error during login:", error);
    return { status: "error", message: "An error occurred during login." };
  }
};

// A function to log out the user
const logout = () => {
  localStorage.removeItem("employee");
};

export default { logIn, logout };
