// Helper: načítanie zo storage
function getServers() {
    return JSON.parse(localStorage.getItem('servers') || '[]');
}
// Helper: uloženie do storage
function setServers(servers) {
    localStorage.setItem('servers', JSON.stringify(servers));
}
// Redraw table
function renderTable() {
    const servers = getServers();
    const tbody = document.getElementById('serverTable');
    tbody.innerHTML = '';
    servers.forEach((server, idx) => {
        const tr = document.createElement('tr');

        const tdName = document.createElement('td');
        tdName.textContent = server.name;

        const tdStatus = document.createElement('td');
        tdStatus.textContent = server.status.charAt(0).toUpperCase() + server.status.slice(1);
        tdStatus.className = 'status-' + server.status;

        const tdTime = document.createElement('td');
        tdTime.textContent = new Date(server.time).toLocaleString();

        const tdAction = document.createElement('td');
        const delBtn = document.createElement('button');
        delBtn.className = 'action-btn';
        delBtn.title = "Vymazať";
        delBtn.innerHTML = '🗑️';
        delBtn.onclick = () => { 
            if(confirm('Naozaj zmazať tento server?')) {
                servers.splice(idx, 1);
                setServers(servers);
                renderTable();
            }
        };

        // Zmena statusu kliknutím
        tdStatus.style.cursor = 'pointer';
        tdStatus.title = "Klikni na zmenu stavu";
        tdStatus.onclick = () => {
            servers[idx].status = (servers[idx].status === 'online') ? 'offline' : 'online';
            servers[idx].time = new Date().toISOString();
            setServers(servers);
            renderTable();
        };

        tdAction.appendChild(delBtn);
        tr.appendChild(tdName);
        tr.appendChild(tdStatus);
        tr.appendChild(tdTime);
        tr.appendChild(tdAction);

        tbody.appendChild(tr);
    });
}

// Pridávanie servera
document.getElementById('addServerForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('serverName').value.trim();
    const status = document.getElementById('serverStatus').value;
    if(!name) return;
    const servers = getServers();
    servers.push({
        name,
        status,
        time: new Date().toISOString()
    });
    setServers(servers);
    this.reset();
    renderTable();
});

// Prvé renderovanie
renderTable();