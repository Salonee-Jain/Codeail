$(form).keydown(function (e) {
    if (e.key == 'Enter') {
        e.preventDefault();
        return false;
    }
});