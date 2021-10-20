function openModalEditUser(user) {
    $('#idEdit').val(user._id);
    $('#nameEdit').val(user.name);
    $('#emailEdit').val(user.email);
    $('#contactEdit').val(user.contact);
}