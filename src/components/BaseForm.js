import Modal from './modal.js';

export default class BaseForm {
  constructor(actor, modalSelector, apiMethods) {
    this.actor = actor;
    this.api = apiMethods;
    this.items = [];
    this.editingId = null;
    this.deletingId = null;

    this.modal = new Modal({
      actor: this.actor,
      modalFormSelector: modalSelector,
      modalDeleteSelector: '.modal-delete',
      showModalSelector: '.btn--add',
      formSelector: '.modal-form',
    });

    this.deleteMessage = document.querySelector('.delete-message');
    this._initBaseHandlers();
  }

  _initBaseHandlers() {
    // Confirm Delete
    if (this.modal.btnConfirmDeleteEl) {
      this.modal.btnConfirmDeleteEl.addEventListener('click', async () => {
        if (this.deletingId) {
          await this.api.delete(this.deletingId);
          this.modal.closeAll();
        }
      });
    }

    // Submit Form
    if (this.modal.formEl) {
      this.modal.formEl.addEventListener(
        'submit',
        this._handleBaseSubmit.bind(this),
      );
    }

    // Table Clicks (Edit / Delete)
    const table = document.querySelector('.table');
    if (table)
      table.addEventListener('click', this._handleBaseTableClick.bind(this));
  }

  async _handleBaseSubmit(e) {
    e.preventDefault();

    const formInputs = e.target.querySelectorAll('.form-input');
    if (this.validate(formInputs)) {
      const data = this.prepareData(formInputs);
      if (this.editingId) {
        await this.api.update(this.editingId, data);
        //
      } else {
        await this.api.create(data);
      }
      this.modal.closeAll();
    }
  }

  _handleBaseTableClick(e) {
    const tableRow = e.target.closest('.table__row');
    if (!tableRow) return;
    const id = tableRow.dataset.id;
    const item = this.items.find((i) => i.id == id);

    if (e.target.classList.contains('btn--delete')) {
      this.deletingId = id;
      this.deleteMessage.querySelector('span').innerText =
        item.name || item.title;
      this.modal.openDelete();
    }

    if (e.target.classList.contains('btn--edit')) {
      this.editingId = id;
      this.fillForm(item);
      this.modal.setFormTitle(`Edit ${this.actor}`);
      this.modal.setCreateButtonText('Save Changes');
      this.modal.openForm();
    }
  }

  validate() {
    return true;
  }

  // Prepare data to handle add
  prepareData() {
    return {};
  }

  // Fill form if edit
  fillForm() {}
}
