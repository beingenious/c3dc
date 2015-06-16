$(document).ready(function() {
    $('#edit_user').formValidation({
        fields: {
            "user[password]": {
                validators: {
                    stringLength: {
                        min: 6
                    }
                }
            },
            "user[password_confirmation]": {
                validators: {
                    identical: {
                        field: "user[password]"
                    }
                }
            },
            "user[current_password]": {
                validators: {
                    different: {
                        field: "user[password]"
                    },
                    stringLength: {
                        min: 6
                    }
                }
            }
        }
    }).on('success.field.bv', function(e, data) {
            // If the field is empty
            if (data.element.val() === '') {
                var $parent = data.element.parents('.form-group');

                // Remove the has-success class
                $parent.removeClass('has-success');

                // Hide the success icon
                $parent.find('.form-control-feedback[data-bv-icon-for="' + data.field + '"]').hide();
            }
        });
});
