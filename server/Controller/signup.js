const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = formData;
  
    const response = await fetch('http://localhost:5000/api/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
  
    const result = await response.json();
  
    if (response.ok) {
      setMessage(`Login successful! Token: ${result.token}`);
    } else {
      setMessage(result.message);  // Display error message
    }
  };
  