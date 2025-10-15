import { createRouter, createWebHistory } from 'vue-router'
import { AuthGuard } from './middleware'

import LandingPage from '@/views/LandingPage.vue'
import RegisterPage from '@/views/RegisterPage.vue'
import LoginPage from '@/views/LoginPage.vue'
import ForgotPasswordPage from '@/views/ForgotPassword.vue'
import EmailConfirmationPage from '@/views/EmailConfirmation.vue'
import AboutUsPage from '@/views/misc/AboutUs.vue'
import PrivacyPage from '@/views/misc/Privacy.vue'
import TermsOfConditionPage from '@/views/misc/TermsOfCondition.vue'
import ProfilePage from '@/views/user/Profile.vue'
import ProjectPage from '@/views/projects/ProjectPage.vue'
import OffersPage from '@/views/OffersPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'Landing', component: LandingPage },
    { path: '/register', name: 'Register', component: RegisterPage },
    { path: '/login', name: 'Login', component: LoginPage },
    { path: '/forgotpassword', name: 'ForgotPassword', component: ForgotPasswordPage },
    { path: '/emailconfirmation', name: 'EmailConfirmation', component: EmailConfirmationPage },
    { path: '/aboutus', name: 'AboutUs', component: AboutUsPage },
    { path: '/privacy', name: 'Privacy', component: PrivacyPage },
    { path: '/termsofservice', name: 'Terms', component: TermsOfConditionPage },
    { path: '/offers', name: 'Offers', component: OffersPage},
    {
      path: '/profile/:id',
      name: 'Profile',
      component: ProfilePage,
      meta: { requiresAuth: true }
    },
    {
      path: '/item/:id',
      name: 'Item',
      component: ProjectPage
    }

  ],
})

router.beforeEach(AuthGuard)

export default router
