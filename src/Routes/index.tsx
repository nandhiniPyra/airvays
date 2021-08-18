import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
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
import SearchComponent from '../views/SearchComponent';
import BookingSummaryComponent from '../views/BookingSummary';

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path='/home' element={<HomePage />} />
        <Route path='/wishlist' element={<WishlistComponent />} />
        <Route path='/booking' element={<BookingComponent />} />
        <Route path='/bookingSummary' element={<BookingSummaryComponent />} />
        <Route path='/myProfile' element={<MyProfile />} />
        <Route path='/priceAlert' element={<PriceAlert />} />
        <Route
          path='/cancellationRefunds'
          element={<CancellationsRefundsComponent />}
        />
        <Route path='/contactUs' element={<ContactUs />} />
        <Route path='/Faq' element={<FAQ />} />
        <Route path='/aboutUs' element={<AboutUs />} />
        <Route path='/flightList' element={<FlightList />} />
        <Route path='/flightListDetails' element={<FlightListDetails />} />
        <Route path='/flightBooking' element={<FlightBooking />} />
        <Route path='/sideBar' element={<SideBar />} />
        <Route path='/blog' element={<BlogComponent />} />
        <Route path='/blog-detail' element={<BlogDetail />} />
        <Route path='/hotel' element={<HotelsList />} />
        <Route path='/hotel-details' element={<HotelDetails />} />
        <Route path='/hotel-info' element={<HotelInfo />} />
        <Route path='/chart' element={<Chart />} />
        <Route path='/searchComponent' element={<SearchComponent />} />
        <Route path='*' element={<HomePage />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
