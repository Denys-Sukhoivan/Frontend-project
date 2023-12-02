let playersCount = null;
let playerPerPage = 3;
let pagesAmount = null;

fillTable(0, 5)
updatePlayersCount()
createPaginationButtons()

    function fillTable(pageNumber, pageSize) {
        $.get(`http://localhost:8080/rest/players?pageNumber=${pageNumber}&pageSize=${pageSize}`, (players) => {
            console.log(players);

            const $playersTableBody = $('.user-table-body')[0];
            let htmlRows = '';

            players.forEach((player) => {
                htmlRows +=
                    ` <tr>
                        <td class="cell cell_small" >${player.id}</td>
                        <td class="cell" >${player.name}</td>
                        <td class="cell" >${player.tittle}</td>
                        <td class="cell" >${player.race}</td>
                        <td class="cell" >${player.profession}</td>
                        <td class="cell" >${player.level}</td>
                        <td class="cell" >${player.birthday}</td>
                        <td class="cell" >${player.banned}</td>
                  </tr>`
            })

            $playersTableBody.insertAdjacentHTML('beforeend', htmlRows);
        })
    }

    function updatePlayersCount() {
        $.get(`/rest/players/count`, (count) => {
            playersCount = count;
        })
    }

    function createPaginationButtons() {
        pagesAmount = playersCount ? Math.ceil(playersCount/ playerPerPage) : 0;
        console.log(playersCount)
        console.log(pagesAmount)

        const $buttonsContainer = document.querySelector('.pagination-wrapper');

        let paginationButtonsHtml = '';

        for (let i = 1; i < pagesAmount; i++) {
            paginationButtonsHtml += <button value = "${i - 1}">${i}</button>

        }
        $buttonsContainer.insertAdjacentHTML("beforeend", paginationButtonsHtml);
    }

