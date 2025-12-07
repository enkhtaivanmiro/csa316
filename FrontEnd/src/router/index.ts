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
import UploadProject from '@/views/user/UploadProject.vue'
import Projects from '@/views/user/Projects.vue'
import Sales from '@/views/user/Sales.vue'
import ProjectList from '@/views/projects/ProjectList.vue'
import EditProject from '@/views/user/EditProject.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    //eronhii heseg
    { path: '/', name: 'Landing', component: LandingPage },
    { path: '/register', name: 'Register', component: RegisterPage },
    { path: '/login', name: 'Login', component: LoginPage },
    { path: '/forgotpassword', name: 'ForgotPassword', component: ForgotPasswordPage },
    { path: '/emailconfirmation', name: 'EmailConfirmation', component: EmailConfirmationPage },
    { path: '/aboutus', name: 'AboutUs', component: AboutUsPage },
    { path: '/privacy', name: 'Privacy', component: PrivacyPage },
    { path: '/termsofservice', name: 'Terms', component: TermsOfConditionPage },
    { path: '/offers', name: 'Offers', component: OffersPage },

    //Hereglegchiin medeellin heseg
    { path: '/profile/:id', name: 'Profile', component: ProfilePage, meta: { requiresAuth: true } },
    { path: '/profile/:id/create', name: 'CreateProject', component: UploadProject, meta: { requiresAuth: true } },
    { path: '/profile/:id/projects', name: 'UserProjects', component: Projects, meta: { requiresAuth: true } },
    { path: '/profile/:id/sales', name: 'Sales', component: Sales, meta: { requiresAuth: true } },
    { path: '/projects/edit/:id', name: 'EditProject', component: EditProject, meta: { requiresAuth: true } },


    //tusluudiin heseg
    { path: '/projects', name: 'Projects', component: ProjectList },
    { path: '/item/:id', name: 'Item', component: ProjectPage },
  ],
})

router.beforeEach(AuthGuard)

export default router
