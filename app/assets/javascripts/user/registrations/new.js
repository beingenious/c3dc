$(document).ready(function() {
    $('#sign_up').formValidation({
        fields: {
            "email": {
                validators: {
                    notEmpty: {},
                    emailAddress: {}
                }
            },
            "first_name": {
                validators: {
                    notEmpty: {},
                }
            },
            "password": {
                validators: {
                    notEmpty: {},
                    stringLength: {
                        min: 6
                    }
                }
            },
            "password_confirmation": {
                validators: {
                    notEmpty: {},
                    identical: {
                        field: "password"
                    }
                }
            }
        }
    })
    .on('success.form.fv', function(e) {
            // Prevent form submission
            e.preventDefault();

            var $form = $(e.target),
                fv    = $form.data('formValidation');

            // Use Ajax to submit form data
            $.ajax({
                url: "http://www.mymultimediaworld.com:8088/users/",
                type: 'POST',
                datatype: 'json',
                contentType: "application/json",
                data: $form.serialize(),
                error:function(result) {
                    console.log("error sign up" + result);
                },
                success: function(result) {
                    console.log("success sign up" + result);
                     window.location = "/";
                }
            });
        });
});
