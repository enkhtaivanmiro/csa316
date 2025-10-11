export function AuthGuard(to: any, from: any, next: any) {
    const isAuthinticated =!!localStorage.getItem('authToken')
    if (to.meta.requiresAuth && !isAuthinticated) {
        next('/login')
    } else {
        next()
    }
}