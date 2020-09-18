const auth = {
  email: 'EMAIL',
  username: 'USER NAME',
  password: 'PASSWORD',
  password2: 'CONFIRM PASSWORD',
  login: 'LOG IN'
}

export default {
  Auth: {
    header: 'SIGN IN OR CREATE AN ACCOUNT TO POST AN UPCOMING EVENT'
  },
  CreateEvent: {
    header: 'Create an upcoming event',
    date: 'DATE',
    location: 'LOCATION',
    title: 'TITLE',
    tags: 'TAGS',
    description: 'DESCRIPTION',
    submit: 'CREATE'
  },
  Footer: {
    fb: 'Join us on Facebook',
    about: 'About',
    faq: 'Faq',
    contact: 'Contact'
  },
  Header: {
    newsfeed: 'NEWS FEED',
    signIn: 'SIGN IN'
  },
  LoginForm: {
    header: 'Sign in',
    ...auth
  },
  SignupForm: {
    header: 'Create an account',
    ...auth
  },
  Main: {
    createEvent: 'Create Event'
  },
  SearchButton: {
    search: 'Search'
  },
  Stream: {
    close: 'Close',
    subscribe: 'FOLLOW THIS EVENT',
    unsubscribe: 'STOP FOLLOWING THIS EVENT'
  },
  StreamsList: {
    anchor: 'Filter Map',
    close: 'Close',
    filter: 'Filter by'
  },
  StreamPlayerOverlay: {
    header: 'UPCOMING EVENT'
  },
  StreamSide: {
    follow: 'FOLLOW',
    unfollow: 'UNFOLLOW'
  },
  TimeMachine: {
    past: 'PAST',
    live: 'LIVE',
    upcoming: 'UPCOMING'
  },
  UserMenu: {
    logout: 'LOGOUT'
  }
}
