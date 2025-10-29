import { test, expect } from '@playwright/test';
import { testData } from '../data/testData';

test.describe('API Tests', () => {
  let baseURL: string;

  test.beforeAll(async () => {
    baseURL = 'https://jsonplaceholder.typicode.com';
  });

  test('should get all users', async ({ request }) => {
    const response = await request.get(`${baseURL}/users`);
    
    expect(response.status()).toBe(200);
    
    const users = await response.json();
    expect(Array.isArray(users)).toBeTruthy();
    expect(users.length).toBeGreaterThan(0);
    
    // Verify user structure
    const firstUser = users[0];
    expect(firstUser).toHaveProperty('id');
    expect(firstUser).toHaveProperty('name');
    expect(firstUser).toHaveProperty('email');
  });

  test('should get specific user by ID', async ({ request }) => {
    const userId = 1;
    const response = await request.get(`${baseURL}/users/${userId}`);
    
    expect(response.status()).toBe(200);
    
    const user = await response.json();
    expect(user.id).toBe(userId);
    expect(user).toHaveProperty('name');
    expect(user).toHaveProperty('email');
  });

  test('should create new user', async ({ request }) => {
    const newUser = {
      name: 'Test User',
      username: 'testuser',
      email: 'test@example.com'
    };

    const response = await request.post(`${baseURL}/users`, {
      data: newUser
    });
    
    expect(response.status()).toBe(201);
    
    const createdUser = await response.json();
    expect(createdUser.name).toBe(newUser.name);
    expect(createdUser.email).toBe(newUser.email);
    expect(createdUser).toHaveProperty('id');
  });

  test('should update user', async ({ request }) => {
    const userId = 1;
    const updatedUser = {
      name: 'Updated User',
      email: 'updated@example.com'
    };

    const response = await request.put(`${baseURL}/users/${userId}`, {
      data: updatedUser
    });
    
    expect(response.status()).toBe(200);
    
    const user = await response.json();
    expect(user.name).toBe(updatedUser.name);
    expect(user.email).toBe(updatedUser.email);
  });

  test('should delete user', async ({ request }) => {
    const userId = 1;
    const response = await request.delete(`${baseURL}/users/${userId}`);
    
    expect(response.status()).toBe(200);
  });

  test('should handle 404 for non-existent user', async ({ request }) => {
    const response = await request.get(`${baseURL}/users/9999`);
    expect(response.status()).toBe(404);
  });

  test('should get user posts', async ({ request }) => {
    const userId = 1;
    const response = await request.get(`${baseURL}/users/${userId}/posts`);
    
    expect(response.status()).toBe(200);
    
    const posts = await response.json();
    expect(Array.isArray(posts)).toBeTruthy();
    
    if (posts.length > 0) {
      const firstPost = posts[0];
      expect(firstPost.userId).toBe(userId);
      expect(firstPost).toHaveProperty('title');
      expect(firstPost).toHaveProperty('body');
    }
  });

  test('should validate response headers', async ({ request }) => {
    const response = await request.get(`${baseURL}/users`);
    
    expect(response.status()).toBe(200);
    expect(response.headers()['content-type']).toContain('application/json');
  });
});