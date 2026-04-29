export const ROUTES_ENUM = {
  login: () => '/login',
  dashboard: () => '/dashboard',
  userProfile: (id: string) => `/user-profile/${id}`
};
