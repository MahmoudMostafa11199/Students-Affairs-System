// Shared modal utilities for form pages as a class
export default class Modal {
  constructor({
    actor = '',
    modalFormSelector,
    modalDeleteSelector,
    overlaySelector = '.overlay',
    showModalSelector,
    btnCloseSelector = '.close-modal',
    formCancelSelector = '.form-cancel',
    formSelector = '.modal-form',
    btnConfirmDeleteSelector = '.form-delete',
    attachShow = true,
  } = {}) {
    this.actor = actor;
    this.modalEls = document.querySelectorAll('.modal');
    this.modalFormEl = modalFormSelector
      ? document.querySelector(modalFormSelector)
      : null;
    this.modalDeleteEl = modalDeleteSelector
      ? document.querySelector(modalDeleteSelector)
      : null;
    this.overlayEl = document.querySelector(overlaySelector);
    this.showModalSelector = showModalSelector;
    this.showModalEl =
      showModalSelector && attachShow
        ? document.querySelector(showModalSelector)
        : null;
    this.btnCloseEls = document.querySelectorAll(btnCloseSelector);
    this.formCancelEls = document.querySelectorAll(formCancelSelector);
    this.formEl = document.querySelector(formSelector);
    this.btnConfirmDeleteEl = document.querySelector(btnConfirmDeleteSelector);

    // bind handlers
    this.openForm = this.openForm.bind(this);
    this.openDelete = this.openDelete.bind(this);
    this.closeAll = this.closeAll.bind(this);

    // attach event listeners
    if (this.showModalEl)
      this.showModalEl.addEventListener('click', this.openForm);
    if (this.btnCloseEls)
      [...this.btnCloseEls].forEach((btn) =>
        btn.addEventListener('click', this.closeAll),
      );
    if (this.formCancelEls)
      [...this.formCancelEls].forEach((btn) =>
        btn.addEventListener('click', this.closeAll),
      );
    if (this.overlayEl) this.overlayEl.addEventListener('click', this.closeAll);
  }

  openForm() {
    if (this.modalFormEl) this.modalFormEl.classList.remove('hidden');
    if (this.overlayEl) this.overlayEl.classList.remove('hidden');
  }

  openDelete() {
    if (this.modalDeleteEl) this.modalDeleteEl.classList.remove('hidden');
    if (this.overlayEl) this.overlayEl.classList.remove('hidden');
  }

  closeAll() {
    if (this.modalEls)
      [...this.modalEls].forEach((m) => m.classList.add('hidden'));
    if (this.overlayEl) this.overlayEl.classList.add('hidden');
    if (this.formEl) this.formEl.reset();
    document.querySelectorAll('.error').forEach((el) => (el.textContent = ''));

    // reset titles / buttons if exist
    if (this.modalFormEl) {
      const title = this.modalFormEl.querySelector('.modal-title');
      if (title) title.textContent = `Add ${this.actor}`;
    }
    if (this.formEl) {
      const createBtn = this.formEl.querySelector('.form-create');
      if (createBtn) createBtn.textContent = 'Create';
    }
  }

  setFormTitle(title) {
    if (this.modalFormEl) {
      const el = this.modalFormEl.querySelector('.modal-title');
      if (el) el.textContent = title;
    }
  }

  setCreateButtonText(text) {
    if (this.formEl) {
      const el = this.formEl.querySelector('.form-create');
      if (el) el.textContent = text;
    }
  }
}
