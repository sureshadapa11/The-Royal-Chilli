export default async function handler(req, res) {
    // CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    if (req.method === 'OPTIONS') return res.status(200).end();
    if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

    const { amount, currency = 'GBP', description, reference } = req.body || {};
    if (!amount || isNaN(Number(amount))) {
        return res.status(400).json({ error: 'Invalid amount' });
    }

    const apiKey = process.env.SUMUP_API_KEY;
    if (!apiKey) {
        return res.status(500).json({ error: 'Payment service not configured. Add SUMUP_API_KEY to Vercel environment variables.' });
    }

    try {
        const sumupRes = await fetch('https://api.sumup.com/v0.1/checkouts', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                checkout_reference: reference || `RC-${Date.now()}`,
                amount: Number(amount),
                currency,
                description: description || 'The Royal Chilli Order'
            })
        });

        const data = await sumupRes.json();
        if (!sumupRes.ok) {
            return res.status(sumupRes.status).json({ error: data.message || 'SumUp error' });
        }
        return res.status(200).json({ checkout_id: data.id, reference: data.checkout_reference });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
}
