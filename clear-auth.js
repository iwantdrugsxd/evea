// Clear authentication cookies
console.log('🔧 Clearing authentication cookies...');

// Clear auth-token cookie
document.cookie = 'auth-token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; SameSite=Strict; Secure';
console.log('✅ Cleared auth-token cookie');

// Clear vendorToken cookie
document.cookie = 'vendorToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; SameSite=Strict; Secure';
console.log('✅ Cleared vendorToken cookie');

// Reload the page
console.log('🔄 Reloading page...');
window.location.reload();
