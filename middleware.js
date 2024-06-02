import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// all routes are unprotected by default
// you must opt-in to protection for routes

const isProtectedRoute = createRouteMatcher([
  '/dashboard(.*)',
  '/worksheets(.*)',
]);

export default clerkMiddleware((auth, req) => {
  if (isProtectedRoute(req)) auth().protect();
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};