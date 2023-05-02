const routes = [
  {
    path: '/parent',
    component: () => import('layouts/ParentLayout.vue'),
    meta: { requiresAuth: true },
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      { path: '/parent/sitters', component: () => import('pages/p_sitters.vue') },
      { path: '/parent/sitters/details', name: 'sitterDetails', props: true, component: () => import('pages/p_sitterdetails.vue') },
      { path: '/parent/sitters/reviews/:id', name: 'sitterReviews', component: () => import('pages/p_sitterReviews.vue') },
      { path: '/parent/profile', component: () => import('pages/p_profile.vue') },
      { path: '/parent/jobs', component: () => import('pages/p_jobs.vue') },
      { path: '/parent/jobs/editjob/:id', name: 'editJob', component: () => import('pages/p_editjob.vue') },
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
      { path: '/sitter/parents/details', name: 'viewParent', component: () => import('pages/s_viewParent.vue') },
      { path: '/sitter/jobs', component: () => import('pages/s_jobs.vue') },
      { path: '/sitter/job/viewjob/:id', name: 'viewJob', component: () => import('pages/s_viewjob.vue') },
      { path: '/sitter/job/viewawardedjob', name: 'viewAwardedJob', props: true, component: () => import('pages/s_ViewAwardedJob.vue') },
      { path: '/sitter/reviews', component: () => import('pages/s_reviews.vue') }
    ]
  },
  { path: '/', component: () => import('pages/Login.vue'), meta: { requiresAuth: false } },
  { path: '/register-user-type', component: () => import('pages/RegisterUserType.vue') },
  { path: '/register-local-user', component: () => import('pages/RegisterLocalAuthUser') },
  { path: '/register-parent', component: () => import('pages/RegisterParent.vue') },
  { path: '/register-sitter', component: () => import('pages/RegisterSitter.vue') },
  { path: '/privacy', component: () => import('pages/privacy.vue') },
  { path: '/:catchAll(.*)*', component: () => import('pages/Error404.vue') }
]

export default routes
