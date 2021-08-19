export default [
  {
    path: '/',
    component: '../layouts/BlankLayout',
    routes: [
      {
        path: '/user',
        component: '../layouts/UserLayout',
        routes: [
          {
            name: 'login',
            path: '/user/login',
            component: './User/login',
          },
        ],
      },
      {
        path: '/',
        component: '../layouts/SecurityLayout',
        routes: [
          {
            path: '/',
            component: '../layouts/BasicLayout',
            authority: ['admin', 'user', 'maintainer'],
            routes: [
              {
                path: '/',
                redirect: '/welcome',
              },
              {
                path: '/welcome',
                name: 'Welcome',
                icon: 'smile',
                component: './welcome',
              },
              {
                path: '/resident',
                name: 'Resident',
                icon: 'smile',
                component: './resident',
                authority: ['user'],
              },
              {
                path: '/admin',
                name: 'Admin',
                icon: 'crown',
                component: './admin',
                authority: ['admin'],
              },
              {
                path: '/maintainer',
                name: 'Maintainer ',
                icon: 'crown',
                component: './maintainer',
                authority: ['maintainer'],
              },
              {
                path: '/amenities',
                name: 'Amenities',
                icon: 'crown',
                component: './amenities',
                authority: ['admin', 'user'],
              },
              {
                component: './profile/index',
              },
              {
                component: './404',
              },
            ],
          },
          {
            component: './404',
          },
        ],
      },
    ],
  },
  {
    component: './404',
  },
];
