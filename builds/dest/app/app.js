
TrainingsCtrl.$inject = ["fire", "$filter", "$rootScope"];
NavbarCtrl.$inject = ["$rootScope"];
fire.$inject = ["$log", "$firebaseObject", "$firebaseArray", "$rootScope"];angular
    .module('futher', [
        'ui.router',
        'futher.Navbar',
        'futher.Trainings',
        'futher.fire.service'
    ])
    .config(config);

function config($stateProvider, $urlRouterProvider, $locationProvider) {
    $locationProvider.html5Mode(true);

    $urlRouterProvider.otherwise('/');

    $stateProvider
        .state('/', {
            url: '/',
            templateUrl: 'app/components/trainings.html',
            controller: 'TrainingsCtrl',
            controllerAs: 'vm'
        });
}
angular.module('futher.Trainings', [])
    .controller('TrainingsCtrl', TrainingsCtrl)

function TrainingsCtrl(fire, $filter, $rootScope) {
    var vm = this;

    // exercises
    vm.newex = null;

    vm.addNewEx = function() {
        if (vm.newex) {
            fire.addNewEx(vm.newex);
        }
    };

    vm.removeExFromProgram = function(day, exercise) {
        fire.removeExFromProgram(day, exercise);
    };

    fire.getAllExercises().then(function(_d) {
        vm.exslist = _d;
    });

    // program
    fire.getProgram().then(function(_d) {
        vm.program = _d;
    });

    vm.newProgramExDay = null;
    vm.newProgramExName = null;
    vm.newProgramExSets = null;
    vm.newProgramExRepeats = null;
    vm.addExToProgram = function() {
        if (vm.newProgramExDay && vm.newProgramExName && vm.newProgramExSets && vm.newProgramExRepeats) {
            fire.addExToProgram(vm.newProgramExDay, vm.newProgramExName, vm.newProgramExSets, vm.newProgramExRepeats);
        }
    };
}

angular.module('futher.Navbar', [])
    .controller('NavbarCtrl', NavbarCtrl);

function NavbarCtrl($rootScope) {
    var vm = this;
    var provider = new firebase.auth.GoogleAuthProvider();

    $rootScope.isSigned = false;
    vm.signin = function() {
        firebase.auth().signInWithPopup(provider).then(function(result) {
            $rootScope.isSigned = true;
        }).catch(function(error) {});
    };
    vm.signout = function() {
        firebase.auth().signOut().then(function() {
            $rootScope.isSigned = false;
        }, function(error) {});
    };
}
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

function fire($log, $firebaseObject, $firebaseArray, $rootScope) {
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
        angular.forEach(allExercises, function(value, key) {
            if (value.$value == cb) {
                duplicate = true;
                return;
            }
        });

        if (!duplicate) {
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

    var daysRef = {
        Monday: $firebaseArray(ref.child('program/Monday')),
        Tuesday: $firebaseArray(ref.child('program/Tuesday')),
        Wednesday: $firebaseArray(ref.child('program/Wednesday')),
        Thursday: $firebaseArray(ref.child('program/Thursday')),
        Friday: $firebaseArray(ref.child('program/Friday')),
        Saturday: $firebaseArray(ref.child('program/Saturday')),
        Sunday: $firebaseArray(ref.child('program/Sunday'))
    };

    vm.removeExFromProgram = function(day, exercise) {
        var dayArr = daysRef[day];
        var item = dayArr[exercise];
        return dayArr.$remove(item);
    };

    vm.addExToProgram = function(day, name, sets, repeats) {
        var obj = {
            name: name,
            sets: sets,
            repeats: repeats
        };

        var dayArr = daysRef[day];
        return dayArr.$add(obj);
    };
}
