class ApiService {
  constructor(baseURL = "http://localhost:5000/api") {
    this.baseURL = baseURL;
  }

  async request(endpoint, options = {}) {
    const token = localStorage.getItem("token");

    const config = {
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }), // añade token si existe
      },
      ...options,
    };

    try {
      const response = await fetch(`${this.baseURL}${endpoint}`, config);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          `Error ${response.status}: ${errorData.message || response.statusText}`
        );
      }

      return await response.json();
    } catch (error) {
      console.error("API Request failed:", error);
      throw error;
    }
  }

  get(endpoint) {
    return this.request(endpoint, { method: "GET" });
  }

  post(endpoint, data) {
    return this.request(endpoint, {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  put(endpoint, data) {
    return this.request(endpoint, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  }

  patch(endpoint, data) {
    return this.request(endpoint, {
      method: "PATCH",
      body: JSON.stringify(data),
    });
  }

  delete(endpoint) {
    return this.request(endpoint, { method: "DELETE" });
  }
}

export default new ApiService();
