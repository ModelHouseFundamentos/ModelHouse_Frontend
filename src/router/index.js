
import { createRouter, createWebHistory } from "vue-router";
import Home from "@/public/pages/home.component.vue";
import Account from "@/identity-and-access-management/pages/account.component.vue";
import signUp from "@/identity-and-access-management/pages/sign-up.component.vue";
import project from "@/views/project/pages/project.vue";
import remodeler from "@/request-service-management/pages/business-list.component.vue";
import detail from "@/request-service-management/pages/business-detail.component.vue";
import signIn from "@/identity-and-access-management/pages/sign-in.component.vue";
import ProjectDetail from "@/request-service-management/pages/project-detail.component.vue";
import Request from "@/request-service-management/pages/request.component.vue";
import Proposal from "@/request-service-management/pages/proposal.component.vue";
import Cart from "@/payment-and-subscription-management/pages/Cart.vue";
import ProjectUpdateComponent from "@/request-service-management/pages/project-update.component.vue";
import ProjectTracingComponent from "@/request-service-management/pages/project-tracing.component.vue";
import editProfileComponent from "@/identity-and-access-management/pages/edit-profile.component.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            redirect: "home",
        },
        {
            path: "/home",
            name: "home",
            component: Home,
        },
        {
            path: "/project",
            name: "project",
            component: project,
        },
        {
            path: "/account",
            name: "account",
            component: Account,
        },
        {
            path: "/sign-up",
            name: "sign-up",
            component: signUp,
        },
        {
            path: "/sign-in",
            name: "sign-in",
            component: signIn,
        },
        {
            path: "/remodeler",
            name: "remodeler",
            component: remodeler,
        },
        {
            path:"/detail/:id",
            name:"detail",
            component:detail,
        },
        {
            path:"/detail/:id/project-detail/:projectId",
            name:"project-detail",
            component: ProjectDetail,
        },
        {
            path:"/request",
            name:"request",
            component:Request,
        },
        {
            path:"/proposal/:id",
            name:"proposal",
            component:Proposal,
        },
        {
            path:"/project-update/:id",
            name:"project-update",
            component:ProjectUpdateComponent,
        },
        {
            path:"/project-tracing/:id",
            name:"project-tracing",
            component:ProjectTracingComponent,
        },
        {
            path:"/user/:id/user_profile",
            name:"edit-profile",
            component:editProfileComponent,
        },

        /*  Payment and Subscription Related Routes */

        {
            path:"/subscription",
            name:"cart",
            component: Cart
        },

    ],
});
export default router;