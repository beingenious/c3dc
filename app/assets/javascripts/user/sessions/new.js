$(document).ready(function() {
    $('#sign_in').formValidation({
        live: 'submitted',
        fields: {
            "username": {
                validators: {
                    notEmpty: {
                    }
                }
            },
            "password": {
                validators: {
                    notEmpty: {},
                    stringLength: {
                        min: 6
                    }
                }
            }
        }
    }).on('success.form.fv', function(e) {
            // Prevent form submission
            e.preventDefault();

            var $form = $(e.target),
                fv    = $form.data('formValidation');

            // Use Ajax to submit form data
            $.ajax({
                url: "http://www.mymultimediaworld.com:8088/auth/access_token/",
                type: 'POST',
                datatype: 'json',
                data: $form.serialize(),
                error:function(result) {
                    console.log("error sign in" + result);
                },
                success: function(result) {
                    console.log("success sign in" + result);
                    sessionStorage.setItem('access_token', result.access_token);
                    sessionStorage.setItem('user', result);

                    window.location = "/c3dweb/projects/";
                }
            });
        });

});
