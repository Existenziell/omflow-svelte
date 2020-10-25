import { writable } from 'svelte/store';

// Globally accessible
export const isLoggedIn = writable();

// user/teacher/admin - Change views accordingly
export const role = writable("user");

// The token to auth towards the API
export const token = writable('');

// Global logout function
export const logout = () => {
  localStorage.clear();
}

// Current logged-in user
let _user = localStorage.getItem('omflowUser');
export const currentUser = writable(_user ? JSON.parse(_user) : null);
currentUser.subscribe((value) => {
  if (value) localStorage.setItem('omflowUser', JSON.stringify(value));
  else localStorage.removeItem('omflowUser'); // for logout
});
