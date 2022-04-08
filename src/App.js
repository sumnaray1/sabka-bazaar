import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import './App.css';

import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
// import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import SignIn from './pages/signIN/signIn.component';
import SignUp from './pages/sign-up/sign-up.component';
import CheckoutPage from './pages/checkout/checkout.component';
import AthRequired from './auth/auth.component'
import Footer from './components/footer/footer.component';

import Header from './components/header/header.component';

import { auth, createUserProfileDocument } from './firebase/firebase.utils';
import { setCurrentUser } from './redux/user/user.actions';
import { selectCurrentUser } from './redux/user/user.selectors';


class App extends React.Component {
  unsubscribeFromAuth = null;

  componentDidMount() {
    const { setCurrentUser ,clearBasket} = this.props;

    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot(snapShot => {
          setCurrentUser({
            id: snapShot.id,
            ...snapShot.data()
          });
        });
      }

      setCurrentUser(userAuth);
    },err => {console.log(err)});
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div>
        <Header />
        <Routes>
          <Route exact path='/' element={<HomePage  />} />
          <Route path='/products/*' element={<ShopPage />} />
          <Route exact path='/checkout' element={<CheckoutPage />} />
          <Route
            exact
            path='/signin'
            element={
              <AthRequired currentUser={this.props.currentUser}>
                 <SignIn />
             </AthRequired>
            }
          />
           <Route
            exact
            path='/signup'
            element={
              <AthRequired currentUser={this.props.currentUser}>
                 <SignUp />
             </AthRequired>
            }
          />
        </Routes>
        <Footer/>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
});

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
