const API_BASE_URL = 'http://localhost:8080';

// Generic function to handle API requests
async function apiRequest(url, options = {}) {
  const response = await fetch(`${API_BASE_URL}${url}`, {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  });

  if (!response.ok) {
    throw new Error(`API Error: ${response.status} ${response.statusText}`);
  }

  // Handle 204 No Content responses
  if (response.status === 204) {
    return null;
  }

  return response.json();
}

// Student API functions
export const studentsApi = {
  // Get all students
  getAll: () => apiRequest('/students'),

  // Get a specific student by ID
  getById: (id) => apiRequest(`/students/${id}`),

  // Create a new student
  create: (student) => apiRequest('/students', {
    method: 'POST',
    body: JSON.stringify(student),
  }),

  // Update an existing student
  update: (id, student) => apiRequest(`/students/${id}`, {
    method: 'PUT',
    body: JSON.stringify(student),
  }),

  // Delete a student
  delete: (id) => apiRequest(`/students/${id}`, {
    method: 'DELETE',
  }),
};

// Codebook API functions
export const codebooksApi = {
  // Get codebook items for a specific codebook code
  getItems: (codebookCode) => apiRequest(`/codebooks/${codebookCode}`),
};

// Utility function to get English localization of codebook items
export function getCodebookDisplayValue(codebookItems, code) {
  const item = codebookItems.find(item => item.code === code);
  return item ? item.names.en : code;
} 