
TrainingsCtrl.$inject = ["fire", "$filter"];
fire.$inject = ["$log", "$firebaseObject", "$firebaseArray"];angular
    .module('futher', [
        'ui.router',
        'futher.fire.service',
        'futher.Trainings'
    ])
    .config(config);

function config($stateProvider, $urlRouterProvider, $locationProvider) {
    // $locationProvider.html5Mode(true);

    $urlRouterProvider.otherwise('/');

    $stateProvider
        .state('/', {
            url: '/',
            template: ''
        })
        .state('trainings', {
            url: '/trainings',
            templateUrl: 'app/components/trainings.html',
            controller: 'TrainingsCtrl',
            controllerAs: 'vm'
        })
        .state('nutrition', {
            url: '/nutrition',
            templateUrl: 'app/components/nutrition.html'
        });
}

angular.module('futher.Trainings', [])
    .controller('TrainingsCtrl', TrainingsCtrl)

function TrainingsCtrl(fire, $filter) {
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

    var daysInWeekList = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
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

    vm.removeExFromProgram = function(day, exercise) {
        var dayRef = ref.child('program/' + day);
        var dayArr = $firebaseArray(dayRef);
        var item = dayArr[exercise];
        console.log(dayArr[exercise])
        return dayArr.$remove(item);
    };

    vm.addExToProgram = function(day, name, sets, repeats) {
        var obj = {
            name: name,
            sets: sets,
            repeats: repeats
        };

        // var dayExists = false;
        // angular.forEach(programArr, function(value,key){
        //     if (value == day){
        //         dayExists = true;
        //     }
        // });

        var dayRef = ref.child('program/' + day);
        var dayArr = $firebaseArray(dayRef);
        dayArr.$add(obj);
    };
}
