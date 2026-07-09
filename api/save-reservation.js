export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    if (req.method === 'OPTIONS') return res.status(200).end();
    if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

    const { name, phone, date, time, guests, occasion, notes } = req.body || {};
    if (!name || !date || !time) {
        return res.status(400).json({ error: 'Name, date and time are required' });
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
        // Read current reservations.json
        const getRes = await fetch(apiBase, { headers });
        let reservations = [];
        let sha = null;
        if (getRes.ok) {
            const fileData = await getRes.json();
            sha = fileData.sha;
            reservations = JSON.parse(Buffer.from(fileData.content, 'base64').toString('utf8'));
        }

        // Build new booking record
        const booking = {
            id: `RES-${Date.now()}`,
            name: name.trim(),
            phone: phone?.trim() || '',
            date,
            time,
            guests: guests || '',
            occasion: occasion || '',
            notes: notes?.trim() || '',
            status: 'pending',
            createdAt: new Date().toISOString()
        };
        reservations.push(booking);

        // Write back to GitHub
        const content = Buffer.from(JSON.stringify(reservations, null, 2)).toString('base64');
        const putBody  = {
            message: `New reservation: ${name} on ${date} at ${time}`,
            content,
            ...(sha ? { sha } : {})
        };
        const putRes = await fetch(apiBase, { method: 'PUT', headers, body: JSON.stringify(putBody) });
        if (!putRes.ok) {
            const err = await putRes.json().catch(() => ({}));
            return res.status(500).json({ error: err.message || 'Failed to save reservation' });
        }

        return res.status(200).json({ success: true, id: booking.id });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
}
