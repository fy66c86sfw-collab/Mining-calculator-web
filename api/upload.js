
upload.js
import { put } from '@vercel/blob';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { filename, fileContent } = req.body;

    if (!filename || !fileContent) {
      return res.status(400).json({ error: 'filename and fileContent required' });
    }

    // Upload to Vercel Blob
    const blob = await put(filename, fileContent, {
      access: 'public',
      addRandomSuffix: true,
    });

    return res.status(200).json({
      success: true,
      url: blob.url,
      filename: blob.pathname,
    });
  } catch (error) {
    console.error('Upload error:', error);
    return res.status(500).json({ error: error.message });
  }
}
