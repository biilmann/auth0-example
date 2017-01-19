import Auth0Lock from "auth0-lock";
import cookies from "cookies-js";

const clientID = "Nhebo8BNzPnn7wUqzhGm0cdLEP2McLCC";
const domain = "netlify.auth0.com";
const lock = new Auth0Lock(clientID, domain, {auth: {
  params: {scope: "openid email user_metadata app_metadata picture"},
}});

lock.on("authenticated", (authResult) => {
  console.log("authenticated: %o - %o", authResult, lock);
  lock.getProfile(authResult.idToken, (err, profile) => {
    console.log("err: %o", err);
    console.log("Got idtoken: %o", authResult.idToken);
    console.log("profile is: %o", profile);
    cookies.set("nf_jwt", authResult.idToken);

  });
});

const loginButtons = document.getElementsByClassName("login-button");
Array.from(loginButtons).forEach((el) => {
  el.addEventListener("click", (e) => {
    e.preventDefault();
    lock.show();
  }, false);
});

const logoutButtons = document.getElementsByClassName("logout-button");
Array.from(logoutButtons).forEach((el) => {
  el.addEventListener("click", (e) => {
    e.preventDefault();
    cookies.expire("nf_jwt");
  }, false);
});
