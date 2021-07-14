import { lazy } from 'react'
import { Redirect } from 'react-router-dom'

const SocialRoutes = [
    {
        //path: ':vanity_slug',
        path: '/pages/profile',
        component: lazy(() => import('../../views/social/profile/index'))
    },
    {
         //path: ':vanity_slug',
        path: '/vanity_slug/profilepets',
        component: lazy(() => import('../../views/social/profile/ProfilePhotos'))
    },
    {
        path: '/apps/email',
        exact: true,
        appLayout: true,
        className: 'email-application',
        component: lazy(() => import('../../views/apps/email'))
    },
    {
        path: '/apps/email',
        exact: true,
        appLayout: true,
        className: 'email-application',
        component: lazy(() => import('../../views/apps/email'))
    },
    {
        path: '/apps/email',
        exact: true,
        appLayout: true,
        className: 'email-application',
        component: lazy(() => import('../../views/apps/email'))
    },
    {
        path: '/apps/email',
        exact: true,
        appLayout: true,
        className: 'email-application',
        component: lazy(() => import('../../views/apps/email'))
    }

]

export default SocialRoutes
