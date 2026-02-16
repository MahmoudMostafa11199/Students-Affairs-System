export default class View {
  search_input = document.getElementById('search-input');
  tableBody = document.querySelector('.table__body');

  selectPerPage = document.querySelector('.table-operations__filter #per-page');
  paginationPages = document.querySelector('.pagination__pages');
  pageFrom = document.querySelector('.pagination__from');
  pageTo = document.querySelector('.pagination__to');
  pageTotal = document.querySelector('.pagination__total');
  btnNext = document.querySelector('.btn--next');
  btnPrev = document.querySelector('.btn--prev');

  isAsc = true;
  currentPage = 1;
  data = [];

  constructor() {
    this._initPaginationListeners();
  }

  addHandlerRender(handler) {
    window.addEventListener('load', handler);
  }

  //
  render(data) {
    this.data = data;
    this.tableBody.innerHTML = '';

    const perPage = this.selectPerPage.value;
    const limit = perPage === 'all' ? data.length : +perPage;

    const totalPages = Math.ceil(data.length / limit);
    if (this.currentPage > totalPages) this.currentPage = 1;

    this.paginationPages.innerHTML = '';
    this._initPaginationPageButtons(totalPages);

    const start = (this.currentPage - 1) * limit;
    const end = perPage === 'all' ? data.length : start + limit;

    data.slice(start, end).forEach((item, i) => {
      this.generatMarkup(item, start + i + 1);
    });

    this._updatePaginationInfo(data.length, start, end, limit);
  }

  //
  sort(handler) {
    document
      .querySelector('.table__row--head')
      .addEventListener('click', async (e) => {
        const sortBy = e.target.closest('th').dataset.title;

        if (this.columnsSort.includes(sortBy)) {
          this.isAsc = !this.isAsc;
          const order = this.isAsc ? 'asc' : 'desc';

          const data = await handler(sortBy, order);

          this.render(data);
        }
      });
  }

  //
  search(handler) {
    this.search_input.addEventListener('input', async (e) => {
      const query = e.target.value.toLowerCase();
      const data = await handler(query);
      this.currentPage = 1;

      if (!data.length) {
        this.tableBody.innerHTML = `
          <tr>
            <td colspan="7" class="no-data-found">
              No ${this.constructor.name.split('V')[0]}s found matching your search.
            </td>
          </tr>`;

        //
      } else {
        this.render(data);
      }
    });
  }

  //
  _updatePaginationInfo(totalItems, start, end, limit) {
    //
    this.pageFrom.textContent = totalItems === 0 ? 0 : start + 1;
    this.pageTo.textContent = end >= totalItems ? totalItems : end;
    this.pageTotal.textContent = totalItems;

    //
    this.btnPrev.disabled = this.currentPage === 1;

    //
    this.btnNext.disabled = end >= totalItems || limit === totalItems;
  }

  //
  _initPaginationListeners() {
    //
    this.selectPerPage.addEventListener('change', () => {
      this.currentPage = 1;
      this.render(this.data);
    });

    //
    this.btnPrev.addEventListener('click', () => {
      if (this.currentPage > 1) {
        this.currentPage--;
        this.render(this.data);
      }
    });

    //
    this.btnNext.addEventListener('click', () => {
      this.currentPage++;
      this.render(this.data);
    });

    //
    this.paginationPages.addEventListener('click', (e) => {
      if (e.target.classList.contains('pagination__page-btn')) {
        const page = +e.target.dataset.page;
        if (this.currentPage === page) return;
        this.currentPage = page;
        this.render(this.data);
      }
    });
  }

  //
  _initPaginationPageButtons(totalPages) {
    for (let page = 1; page <= totalPages; page++) {
      const btnPage = `
        <button class="btn pagination__btn pagination__page-btn ${page == this.currentPage ? 'active' : ''}" data-page="${page}">
          ${page}
        </button>
      `;

      this.paginationPages.innerHTML += btnPage;
    }
  }
}
