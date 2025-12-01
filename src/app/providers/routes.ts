export const ROUTES = {
  HOME: '/',
  MY_PAGE: '/my-page',
  LECTURES_FOR_ME: '/lectures-for-me',
  LECTURES_FOR_ME_DETAIL: '/lectures-for-me/:id',
  LECTURES_FOR_ME_NEW: '/lectures-for-me/new',
  LECTURES_FOR_ME_EDIT: '/lectures-for-me/edit/:id',
  LECTURE_DETAIL: '/lecture-detail/:id',
  LOGIN: '/login',
  SIGNUP: '/signup',
  MY_ACTIVITY: '/my-activity',
  NOT_FOUND: '*',
} as const;