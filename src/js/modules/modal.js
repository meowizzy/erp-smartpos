export const modal = () => {
    const modalDest = document.getElementById("modalContentDestination");
    if (!modalDest) return;

    const modal = modalDest.closest(".site-modal");

    const openModal = () => {
        document.documentElement.classList.add("locked");
        modal.classList.add("opened");
    };

    const closeModal = () => {
        document.documentElement.classList.remove("locked");
        modal.classList.remove("opened");
    };

    const handleClick = (e) => {
        const target = e.target;

        if (target.closest("[localization-modal-target]")) {
            const targetModal = document.querySelector(`[data-modal-id=${target.dataset.modalTarget}]`);

            openModal();
            modalDest.innerHTML = targetModal.outerHTML;
        }

        if (target.closest(".site-modal__close") || !target.closest(".site-modal__window") && !target.closest("[localization-modal-target]")) {
            closeModal();
        }
    };

    document.addEventListener("click", handleClick);
};