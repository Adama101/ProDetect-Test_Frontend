export const paths = {
  home: '/',
  auth: { signIn: '/auth/sign-in', signUp: '/auth/sign-up', resetPassword: '/auth/reset-password' },
  dashboard: {
    dashboard: '/dashboard',
    transactions: '/dashboard/transactions',
    customers: '/dashboard/customers',
    account: '/dashboard/account',
    integrations: '/dashboard/integrations',
    api: '/dashboard/integrations/api',
    documentation: '/dashboard/integrations/api/documentation',
    settings: '/dashboard/settings',
    //integrations: { integration:'/dashboard/integrations', api:'/dashboard/integrations/api', documentation:'/dashboard/integrations/api/documentation'},
  },

} as const;
