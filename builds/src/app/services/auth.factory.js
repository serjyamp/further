angular
    .module("further.auth.factory", ["firebase"])
    .factory("AuthFactory", AuthFactory);

function AuthFactory($firebaseAuth) {
    var auth = $firebaseAuth();

    var service = {
    	authVar: auth,
        signIn: signIn,
        signOut: signOut,
        isLoggedIn: isLoggedIn
    };

    function signIn() {
        auth.$signInWithPopup('google');
    }

    function signOut() {
        auth.$signOut();
    }

    function isLoggedIn() {
        return auth.$getAuth();
    }

    return service;
}
