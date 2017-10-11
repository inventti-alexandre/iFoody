function modalOpen() {
    $document.find('body').addClass('modal-open');
}
$(document).on("hidden.bs.modal",".sub-modal.modal", function () {
    $("body").addClass("modal-open");
});