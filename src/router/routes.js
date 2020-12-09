const routes = [
  {
    path: '/parent',
    component: () => import('layouts/ParentLayout.vue'),
    meta: { requiresAuth: true },
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      { path: '/parent/sitters', component: () => import('pages/p_sitters.vue') },
      { path: '/parent/sitters/details', name: 'sitterDetails', props: true, component: () => import('pages/p_sitterdetails.vue') },
      { path: '/parent/sitters/reviews', name: 'sitterReviews', props: true, component: () => import('pages/p_sitterReviews.vue') },
      { path: '/parent/profile', component: () => import('pages/p_profile.vue') },
      { path: '/parent/jobs', component: () => import('pages/p_jobs.vue') },
      { path: '/parent/jobs/editjob', name: 'editJob', props: true, component: () => import('pages/p_editjob.vue') },
      { path: '/parent/newjob', component: () => import('pages/p_newjob.vue') }
    ]
  }, {
    path: '/sitter',
    component: () => import('layouts/SitterLayout.vue'),
    meta: { requiresAuth: true },
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      { path: '/sitter/profile', component: () => import('pages/s_profile.vue') },
      { path: '/sitter/parents', component: () => import('pages/s_parents.vue') },
      { path: '/sitter/parents/viewparent', name: 'viewParent', props: true, component: () => import('pages/s_viewParent.vue') },
      { path: '/sitter/jobs', component: () => import('pages/s_jobs.vue') },
      { path: '/sitter/job/viewjob', name: 'viewJob', props: true, component: () => import('pages/s_viewjob.vue') },
      { path: '/sitter/job/viewawardedjob', name: 'viewAwardedJob', props: true, component: () => import('pages/s_ViewAwardedJob.vue') },
      { path: '/sitter/reviews', component: () => import('pages/s_reviews.vue') }
    ]
  },
  { path: '/', component: () => import('pages/Login.vue'), meta: { requiresAuth: false } },
  { path: '/register', component: () => import('pages/Register.vue') },
  { path: '/register-local-user', component: () => import('pages/LoginRegister') },
  { path: '/register-parent', component: () => import('pages/p_Register.vue') },
  { path: '/register-sitter', component: () => import('pages/s_Register.vue') }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
