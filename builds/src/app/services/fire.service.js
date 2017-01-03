// Initialize Firebase
var config = {
    apiKey: "AIzaSyDLAofEFCEF-s0_oyxVePgmRQPq-PSh5nk",
    authDomain: "futher-afd4a.firebaseapp.com",
    databaseURL: "https://futher-afd4a.firebaseio.com",
    storageBucket: "futher-afd4a.appspot.com",
    messagingSenderId: "248990263259"
};
firebase.initializeApp(config);

angular
    .module('futher.fire.service', ['firebase'])
    .service('fire', fire);

function fire($log, $firebaseObject, $firebaseArray) {
    var vm = this;

    var ref = firebase.database().ref();

    // exercises
    var exercisesRef = ref.child('exercises');
    var allExercises = $firebaseArray(exercisesRef);
    
    vm.getAllExercises = function(cb) {
        return allExercises.$loaded(cb);
    };
    vm.addNewEx = function(cb) {
        var duplicate = false;
        angular.forEach(allExercises, function(value, key){
            console.log(value.$value);
            if (value.$value == cb){
                duplicate = true;
                return;
            }
        });

        if (!duplicate){
            return allExercises.$add(cb);
        }

        return false;
    };

    // program
    var programRef = ref.child('program');
    var programArr = $firebaseArray(programRef);

    vm.getProgram = function(cb) {
        return programArr.$loaded(cb);
    };

    vm.removeExFromProgram = function(item) {
        return programArr.$remove(item);
    };
}