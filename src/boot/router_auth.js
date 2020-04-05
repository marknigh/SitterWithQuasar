// import something here

// leave the export, even if you don't use it
export default async ({ app, router, store, Vue }) => {
  router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
      // this route requires auth, check if logged in
      // if not, redirect to login page.
      if (store.getters.getCurrentUser == null) {
        next('/')
      } else {
        next()
      }
    } else {
      next() // make sure to always call next()!
    }
  })
}
