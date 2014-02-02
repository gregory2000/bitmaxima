angular.module('summernoteDemo', ['summernote'])
    .controller('OptCtrl', function($scope) {
        $scope.options = {
            height: 150,
            toolbar: [
                ['style', ['bold', 'italic', 'underline', 'clear']],
                ['fontsize', ['fontsize']],
                ['color', ['color']],
                ['para', ['ul', 'ol', 'paragraph']],
                ['height', ['height']]
            ]
        };
    })
    .controller('CodeCtrl', function($scope) {
        $scope.text = "Hello World";
    });