import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import SignIn from '../views/auth/SignIn';
import SignUp from '../views/auth/SignUp';
import ResetPassword from '../views/auth/ResetPassword/index';
import DashboardLayout from '../layouts/DashboardLayout';
import RouteMap, { DashboardRoute } from './RoutesConstants';
import AccountView from '../views/account/AccountView/';
import CustomerListView from '../views/customer/CustomerListView';
import DashboardView from '../views/reports/DashboardView';
import ProductListView from '../views/product/ProductListView';
import SettingsView from '../views/settings/SettingsView';
import ChatlistView from '../views/Chat/Chatlist';
import ChatMessageView from '../views/Chat/ChatMessage';
import PageNotFoundView from '../views/errors/NotFoundView';
import HomePage from '../views/Home/index';
import WishlistComponent from '../views/Wishlist/index';
import BookingComponent from '../views/Booking/Index';
import MyProfile from '../views/MyProfile/index';
import ContactUs from '../views/ContactUs/index';
import FAQ from '../views/FAQ/index';
import FlightList from '../views/List/FlightList';
import FlightListDetails from '../views/FlightListDetails/index';
import FlightBooking from '../views/List/FightBooking';
import PriceAlert from '../views/PriceAlert/index';
import CancellationsRefundsComponent from '../views/CancellationsRefunds/CancellationsRefunds';
import AboutUs from '../views/AboutUs/index';
import SideBar from '../views/SideBar';
import BlogComponent from '../views/Blog/index';
import BlogDetail from '../views/Blog/blogDetail';
import HotelsList from '../views/Hotels/index';
import HotelDetails from '../views/Hotels/hotel';
import HotelInfo from '../views/Hotels/hotelInfo';
import Chart from '../views/Chart/index';

const appName = 'React App';

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={RouteMap.dashboard.default}
          element={<DashboardLayout appName={appName} />}>
          <Route
            path={RouteMap.dashboard.dashboardPage}
            element={<DashboardView />}
          />
          <Route
            path={RouteMap.dashboard.customersPage}
            element={<CustomerListView />}
          />
          <Route
            path={RouteMap.dashboard.productsPage}
            element={<ProductListView />}
          />
          <Route
            path={RouteMap.dashboard.accountPage}
            element={<AccountView />}
          />
          <Route
            path={RouteMap.dashboard.settingsPage}
            element={<SettingsView />}
          />
          <Route
            path={RouteMap.dashboard.chatlistPage}
            element={<ChatlistView />}
          />
          <Route
            path={RouteMap.dashboard.chatPage.concat('/:key/:id')}
            element={<ChatMessageView />}
          />
        </Route>

        <Route
          path={RouteMap.main.default}
          element={<MainLayout appName={appName} />}>
          <Route
            path={RouteMap.main.landingPage}
            element={<Navigate to={DashboardRoute} />}
          />
          <Route path='/home' element={<HomePage />} />
          <Route path='/wishlist' element={<WishlistComponent />} />
          <Route path='/booking' element={<BookingComponent />} />
          <Route path='/myProfile' element={<MyProfile />} />
          <Route path='/priceAlert' element={<PriceAlert />} />
          <Route
            path='/cancellationRefunds'
            element={<CancellationsRefundsComponent />}
          />
          <Route path="/contactUs" element={<ContactUs />} />
          <Route path="/Faq" element={<FAQ />} />
          <Route path="/aboutUs" element={<AboutUs />} />
          <Route path="/flightList" element={<FlightList />} />
          <Route path="/flightListDetails" element={<FlightListDetails />} />
          <Route path="/flightBooking" element={<FlightBooking />} />
          <Route path="/sideBar" element={<SideBar />} />
          <Route path="/blog" element={<BlogComponent />} />
          <Route path="/blog-detail" element={<BlogDetail />} />
          <Route path="/hotel" element={<HotelsList />} />
          <Route path="/hotel-details" element={<HotelDetails />} />
          <Route path="/hotel-info" element={<HotelInfo />} />
          <Route path="/chart" element={<Chart />} />
          <Route path={"/reset-password"} element={<ResetPassword />}/>
          <Route path={RouteMap.main.signinPage} element={<SignIn />} />
          <Route path={RouteMap.main.signupPage} element={<SignUp />} />
          {/* <Route path={RouteMap.main.forgotPage} element={<ResetPassword />} /> */}
          <Route path="*" element={<PageNotFoundView />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
