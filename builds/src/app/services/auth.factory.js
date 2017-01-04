angular
    .module("further.auth.factory", ["firebase"])
    .factory("AuthFactory", AuthFactory);

    function AuthFactory($firebaseAuth){
    	return $firebaseAuth();
    }