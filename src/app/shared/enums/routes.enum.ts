export const ROUTES_ENUM = {
  login: () => '/login',
  dashboard: () => '/dashboard',
  game: () => '/game',
  userProfile: (id: string) => `/user-profile/${id}`
};
