import { put } from '@vercel/blob';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { filename, file } = req.body;

    const blob = await put(filename, file, {
      access: 'public',
      addRandomSuffix: true,
    });

    res.status(200).json(blob);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
