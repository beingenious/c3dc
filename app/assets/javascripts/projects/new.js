$(document).ready(function() {
    $('#newproject').formValidation({
        fields: {
            "name": {
                validators: {
                    notEmpty: {}
                }
            },
            "description": {
                validators: {
                    notEmpty: {},
                }
            },
             "acquisition": {
                validators: {
                    notEmpty: {},
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
                url: "http://www.mymultimediaworld.com:8088/projects/",
                type: 'POST',
                datatype: 'json',
                data: $form.serialize(),
                error:function(result) {
                    console.log("error project new" + result);
                },
                success: function(result) {
                     window.location = "/projects/";
                },
                beforeSend : C3dc.before_send
            });
        });
});
