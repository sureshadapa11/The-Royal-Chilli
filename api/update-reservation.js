export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    if (req.method === 'OPTIONS') return res.status(200).end();
    if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

    const { id, status } = req.body || {};
    if (!id || !status) {
        return res.status(400).json({ error: 'id and status are required' });
    }
    const validStatuses = ['pending', 'confirmed', 'cancelled'];
    if (!validStatuses.includes(status)) {
        return res.status(400).json({ error: 'Invalid status' });
    }

    const token = process.env.GITHUB_TOKEN;
    const repo  = 'sureshadapa11/The-Royal-Chilli';
    const file  = 'reservations.json';
    const apiBase = `https://api.github.com/repos/${repo}/contents/${file}`;
    const headers = {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/vnd.github.v3+json',
        'Content-Type': 'application/json'
    };

    try {
        const getRes = await fetch(apiBase, { headers });
        if (!getRes.ok) return res.status(500).json({ error: 'Failed to read reservations' });

        const fileData = await getRes.json();
        const sha = fileData.sha;
        const reservations = JSON.parse(Buffer.from(fileData.content, 'base64').toString('utf8'));

        const idx = reservations.findIndex(r => r.id === id);
        if (idx === -1) return res.status(404).json({ error: 'Reservation not found' });

        reservations[idx].status = status;
        reservations[idx].updatedAt = new Date().toISOString();

        const content = Buffer.from(JSON.stringify(reservations, null, 2)).toString('base64');
        const putBody = {
            message: `Update reservation ${id} to ${status}`,
            content,
            sha
        };
        const putRes = await fetch(apiBase, { method: 'PUT', headers, body: JSON.stringify(putBody) });
        if (!putRes.ok) {
            const err = await putRes.json().catch(() => ({}));
            return res.status(500).json({ error: err.message || 'Failed to update reservation' });
        }

        return res.status(200).json({ success: true, id, status });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
}
