const main = "/";
export const MainLayoutRoute = main;
export const LandingPageRoute = main;
export const SigninRoute = `${main}signin`;
export const SignupRoute = `${main}signup`;
export const ForgotPassword = `${main}forgotpassword`;

const dashboard = "/app";
export const DashboardLayoutRoute = dashboard;
export const DashboardRoute = `/home`;
export const CustomersRoute = `${dashboard}/customers`;
export const ProductsRoute = `${dashboard}/products`;
export const AccountRoute = `${dashboard}/account`;
export const SettingsRoute = `${dashboard}/settings`;
export const ChatlistRoute = `${dashboard}/chatlist`;
export const ChatMessageRoute = `${dashboard}/chat-message`;
export const FlightListRoute = `/flightList`;
export const FlightListDetails = `/flightListDetails`;


const RouteMap = {
  main: {
    default: main,
    landingPage: main,
    signinPage: SigninRoute.replace(main, ""),
    signupPage: SignupRoute.replace(main, ""),
    forgotPage: ForgotPassword.replace(main, ""),
  },
  dashboard: {
    default: dashboard,
    dashboardPage: DashboardRoute.replace(dashboard, ""),
    customersPage: CustomersRoute.replace(dashboard, ""),
    productsPage: ProductsRoute.replace(dashboard, ""),
    accountPage: AccountRoute.replace(dashboard, ""),
    settingsPage: SettingsRoute.replace(dashboard, ""),
    chatlistPage: ChatlistRoute.replace(dashboard, ""),
    chatPage: ChatMessageRoute.replace(dashboard, ""),
  },
};

export default RouteMap;
