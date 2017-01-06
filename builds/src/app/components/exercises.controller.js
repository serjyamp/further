angular.module('further.Exercises', [])
    .controller('ExercisesCtrl', ExercisesCtrl);

function ExercisesCtrl(fire, $rootScope) {
    var vm = this;
    vm.newex = null;
    vm.exslist = [];
    
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
}
