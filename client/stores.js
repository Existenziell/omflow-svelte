import { writable } from 'svelte/store';

// Globally accessible
export const isLoggedIn = writable(false);

// user/teacher/admin - Change views accordingly
export const role = writable("user");

// The token to auth towards the API
export const token = writable('');

// Current logged-in user
let _user = localStorage.getItem('omflowUser');
export const currentUser = writable(_user ? JSON.parse(_user) : null);
currentUser.subscribe((value) => {
  if (value) localStorage.setItem('omflowUser', JSON.stringify(value));
  else localStorage.removeItem('omflowUser'); // for logout
});

// Global logout function
export const logout = () => {
  localStorage.clear();
  isLoggedIn.set(false);
  role.set("user");
  token.set("");
  currentUser.set("");
}

// Expose teachers array to all components
export const teachers = writable();

// Load all teachers / called from App.svelte
export const fetchTeachers = async () => {
  const res = await fetch(`${process.env.API_URL}/teachers`);
  const teachers = await res.json();
  if (res.ok) {
    return teachers;
  } else {
    throw new Error(teachers);
  }
};
