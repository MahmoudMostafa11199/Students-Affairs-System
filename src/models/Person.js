let parentElement = document.querySelector("table");
let displayTr = `<tr class="table__row">
          <td class="table__data">01</td>
          <td class="table__data">Mahmoud Mostafa</td>
          <td class="table__data">26</td>
          <td class="table__data">melshahat799@gmail.com</td>
          <td class="table__data">CS, React, English</td>
          <td class="table__data">4</td>
          <th class="table__data">
            <div class="table__actions">
              <button class="btn btn--edit">Edit</button>
              <button class="btn btn--delete">Delete</button>
            </div>
          </td>
    </tr>`;
parentElement.insertAdjacentHTML("beforeend", displayTr);
