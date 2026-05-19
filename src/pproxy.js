// import { NextResponse } from 'next/server';

// export function middleware(request) {
//   const token = request.cookies.get('better-auth.session-token'); 
//   const { pathname } = request.nextUrl;

//   const privateRoutes = ['/add-car', '/my-bookings', '/my-added-cars'];

//   if (privateRoutes.includes(pathname) && !token) {
//     return NextResponse.redirect(new URL('/login', request.url));
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: ['/add-car', '/my-bookings', '/my-added-cars'],
// };