// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Helper function for authenticated requests
function getAuthHeader() {
  const adminPassword = localStorage.getItem('adminToken');
  if (adminPassword) {
    return {
      'Authorization': `Bearer ${adminPassword}`
    };
  }
  return {};
}

// ============ PROJECTS ============
export async function fetchProjects(status?: string) {
  try {
    const url = status ? `${API_BASE_URL}/projects?status=${status}` : `${API_BASE_URL}/projects`;
    const response = await fetch(url);
    if (!response.ok) throw new Error('Failed to fetch projects');
    return await response.json();
  } catch (error) {
    console.error('Error fetching projects:', error);
    return [];
  }
}

export async function createProject(project: any) {
  try {
    const response = await fetch(`${API_BASE_URL}/projects`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader()
      },
      body: JSON.stringify(project)
    });
    if (!response.ok) throw new Error('Failed to create project');
    return await response.json();
  } catch (error) {
    console.error('Error creating project:', error);
    throw error;
  }
}

export async function updateProject(id: string, updates: any) {
  try {
    const response = await fetch(`${API_BASE_URL}/projects/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader()
      },
      body: JSON.stringify(updates)
    });
    if (!response.ok) throw new Error('Failed to update project');
    return await response.json();
  } catch (error) {
    console.error('Error updating project:', error);
    throw error;
  }
}

export async function deleteProject(id: string) {
  try {
    const response = await fetch(`${API_BASE_URL}/projects/${id}`, {
      method: 'DELETE',
      headers: getAuthHeader()
    });
    if (!response.ok) throw new Error('Failed to delete project');
    return await response.json();
  } catch (error) {
    console.error('Error deleting project:', error);
    throw error;
  }
}

// ============ PRODUCTS ============
export async function fetchProducts(category?: string) {
  try {
    const url = category ? `${API_BASE_URL}/products?category=${category}` : `${API_BASE_URL}/products`;
    const response = await fetch(url);
    if (!response.ok) throw new Error('Failed to fetch products');
    return await response.json();
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

export async function createProduct(product: any) {
  try {
    const response = await fetch(`${API_BASE_URL}/products`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader()
      },
      body: JSON.stringify(product)
    });
    if (!response.ok) throw new Error('Failed to create product');
    return await response.json();
  } catch (error) {
    console.error('Error creating product:', error);
    throw error;
  }
}

export async function updateProduct(id: string, updates: any) {
  try {
    const response = await fetch(`${API_BASE_URL}/products/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader()
      },
      body: JSON.stringify(updates)
    });
    if (!response.ok) throw new Error('Failed to update product');
    return await response.json();
  } catch (error) {
    console.error('Error updating product:', error);
    throw error;
  }
}

export async function deleteProduct(id: string) {
  try {
    const response = await fetch(`${API_BASE_URL}/products/${id}`, {
      method: 'DELETE',
      headers: getAuthHeader()
    });
    if (!response.ok) throw new Error('Failed to delete product');
    return await response.json();
  } catch (error) {
    console.error('Error deleting product:', error);
    throw error;
  }
}

// ============ REVIEWS ============
export async function fetchReviews(targetId?: string) {
  try {
    const url = targetId ? `${API_BASE_URL}/reviews?targetId=${targetId}` : `${API_BASE_URL}/reviews`;
    const response = await fetch(url);
    if (!response.ok) throw new Error('Failed to fetch reviews');
    return await response.json();
  } catch (error) {
    console.error('Error fetching reviews:', error);
    return [];
  }
}

export async function createReview(review: any) {
  try {
    const response = await fetch(`${API_BASE_URL}/reviews`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(review)
    });
    if (!response.ok) throw new Error('Failed to create review');
    return await response.json();
  } catch (error) {
    console.error('Error creating review:', error);
    throw error;
  }
}

// ============ GALLERY ============
export async function fetchGallery() {
  try {
    const response = await fetch(`${API_BASE_URL}/gallery`);
    if (!response.ok) throw new Error('Failed to fetch gallery');
    return await response.json();
  } catch (error) {
    console.error('Error fetching gallery:', error);
    return [];
  }
}

export async function createGalleryItem(item: any) {
  try {
    const response = await fetch(`${API_BASE_URL}/gallery`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader()
      },
      body: JSON.stringify(item)
    });
    if (!response.ok) throw new Error('Failed to create gallery item');
    return await response.json();
  } catch (error) {
    console.error('Error creating gallery item:', error);
    throw error;
  }
}

export async function deleteGalleryItem(id: string) {
  try {
    const response = await fetch(`${API_BASE_URL}/gallery/${id}`, {
      method: 'DELETE',
      headers: getAuthHeader()
    });
    if (!response.ok) throw new Error('Failed to delete gallery item');
    return await response.json();
  } catch (error) {
    console.error('Error deleting gallery item:', error);
    throw error;
  }
}

// ============ AI SERVICES ============
export async function getBuildingAdvice(query: string) {
  try {
    const response = await fetch(`${API_BASE_URL}/ai/advice`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ query })
    });
    if (!response.ok) throw new Error('Failed to get advice');
    const data = await response.json();
    return data.advice;
  } catch (error) {
    console.error('Error getting advice:', error);
    return "I'm sorry, I'm having trouble connecting to my design database right now. Please try again later.";
  }
}

export async function summarizeReviews(reviews: string[]) {
  try {
    const response = await fetch(`${API_BASE_URL}/ai/summarize-reviews`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ reviews })
    });
    if (!response.ok) throw new Error('Failed to summarize reviews');
    const data = await response.json();
    return data.summary;
  } catch (error) {
    console.error('Error summarizing reviews:', error);
    return "Our clients consistently praise our attention to detail and transformative landscape designs.";
  }
}
