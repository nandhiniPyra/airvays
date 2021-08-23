import * as firebase from 'firebase/app';
import 'firebase/auth';
import { _signup } from '../services/api/auth';

// Google Login Method
const GoogleSignIn = (onSuccess: any, onError: any) => {
  // Get the users ID token
  const provider = new firebase.auth.GoogleAuthProvider();
  provider.addScope('profile');
  provider.setCustomParameters({
    display: 'popup',
    prompt: 'select_account',
  });
  firebase
    .auth()
    .signInWithPopup(provider)
    .then((res) => {
      firebase.auth().onAuthStateChanged(async function (user) {
        if (user !== null) {
          if (user.displayName == null) {
            window.localStorage.setItem('userName', `${user.email}`);
          } else {
            window.localStorage.setItem('userName', `${user.displayName}`);
          }
          await user.getIdToken().then(function (idToken) {
            window.localStorage.setItem('accesstoken', `${idToken}`);
            return onSuccess(); // return onSuccess();
          });
        }
      });
    })
    .catch((err) => {
      console.log('Error while Google Login', err);
      onError(err.message || 'Something went wrong. Try again later');
    });
};

// Facebook Login method
const FaceBookSignIn = (onError: any) => {
  // Get the users ID token
  const provider = new firebase.auth.FacebookAuthProvider();
  provider.addScope('public_profile');
  provider.setCustomParameters({
    display: 'popup',
    prompt: 'select_account',
  });
  firebase
    .auth()
    .signInWithPopup(provider)
    .catch((err) => {
      console.log('Error while Facebook Login', err);
      onError(err.message || 'Something went wrong. Try again later');
    });
};

export const SocialLogin = { GoogleSignIn, FaceBookSignIn };

export const signInWithCredenrials = (
  email: string,
  password: string,
  onSuccess: any,
  onError: any,
) => {
  if (email && password) {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((res) => {
        firebase.auth().onAuthStateChanged(async function (user) {
          if (user !== null) {
            if (user.displayName == null) {
              window.localStorage.setItem('userName', `${user.email}`);
            } else {
              window.localStorage.setItem('userName', `${user.displayName}`);
            }
            await user.getIdToken().then(function (idToken) {
              window.localStorage.setItem('accesstoken', `${idToken}`);
              return onSuccess(); // return onSuccess();
            });
          }
        });
      })
      .catch((err) => {
        console.log('Error while Login', err);
        onError(err.message);
      });
  } else {
    onError(`Enter ${email ? 'password' : 'email'}`);
  }
};

interface NewUser {
  fullname: string;
  email: string;
  password: string;
  confirmPassword: string;
}
export const CreateUserWithCredentials = (
  user: NewUser,
  onSuccess: any,
  onError: any,
) => {
  const { fullname, email, password, confirmPassword } = user;
  if (fullname && email && password) {
    if (password !== confirmPassword) return onError('Password does not match');
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(
        (user) => {
          // eslint-disable-next-line no-unused-expressions
          user &&
            user.user &&
            user.user
              .updateProfile({
                displayName: fullname,
              })
              .then(async () => {
                firebase.auth().onAuthStateChanged(async function (user) {
                  if (user !== null) {
                    await user.getIdToken().then(function (idToken) {
                      window.localStorage.setItem('userName', `${fullname}`);
                      window.localStorage.setItem('accesstoken', `${idToken}`);
                      _signup(
                        { email: email, uid: idToken },
                        function (error: any, response: any) {
                          if (error === null) {
                            if (response.status === 200) {
                              return onSuccess();
                            } else {
                            }
                          } else if (response == null) {
                          }
                        },
                      );
                      console.log('Updated Display name');
                    });
                  }
                });
              })

              .catch((err) => onError(err.message || 'Something went wrong'));
        },
        (err) => {
          console.log('Error while creating user with credentials', err);
          onError(err.message || 'Something went wrong. Try again later');
        },
      )
      .catch((err) => {
        onError(err.message || 'Something went wrong. Try again later');
      });
  } else {
    onError(`Enter ${fullname ? (email ? 'Password' : 'Email') : 'Full Name'}`);
  }
};

// Send Password Reset Link to the Email
export const sendPasswordResetEmail = (
  email: string,
  onSuccess: any,
  onError: any,
) => {
  var actionCodeSettings = {
    url: `https://pyramidions-expo-starter.web.app/signin?email=${email}`,
    handleCodeInApp: true,
    // When multiple custom dynamic link domains are defined, specify which
    // one to use.
    // dynamicLinkDomain: "example.page.link"
  };

  firebase
    .auth()
    .sendPasswordResetEmail(email, actionCodeSettings)
    // .currentUser.sendEmailVerification(actionCodeSettings)
    .then(onSuccess, (err) => {
      // console.log(onSuccess,"onSuccess")

      onError(err.message || 'Something went wrong. Try again later');
    })
    .catch((err) => {
      onError(err.message || 'Something went wrong. Try again later');
    });
};

// Change password
export const ChangeUserPassword = async (
  user: firebase.User | null,
  newPassword: string,
  onSuccess: any,
  onError: any,
) => {
  user &&
    user
      .updatePassword(newPassword)
      .then(
        () => {
          onSuccess('Password Changed');
        },
        (err) => onError(err.message || 'Error while changing password'),
      )
      .catch((err) => {
        onError(err.message || 'Error while changing password');
      });
};

export const updateUserInfo = async (
  user: firebase.User | null,
  {
    displayName,
    photoURL,
  }: {
    displayName?: string | null | undefined;
    photoURL?: string | null | undefined;
  },
  onSuccess: any,
  onError: any,
) => {
  const updateObj: any = {};
  displayName && (updateObj.displayName = displayName);
  photoURL && (updateObj.photoURL = photoURL);
  user &&
    user
      .updateProfile(updateObj)
      .then(
        (res) => {
          onSuccess(
            'Profile Updated Successfully. Refresh the page to see changes',
          );
        },
        (err) => onError(err.message || 'Error while updating profile'),
      )
      .catch((err) => {
        console.log('Error while updating profile', err);
        onError(err.message || 'Error while updating profile');
      });
};

export const AuthStateChangeListener = (callback: any) => {
  const subscriber = firebase.auth().onAuthStateChanged(callback);
  return subscriber;
};

export const LogoutUser = () => {
  return firebase.auth().signOut();
};
