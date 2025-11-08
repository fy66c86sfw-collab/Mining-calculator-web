
upload-test.js
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { filename, fileContent } = req.body;

    if (!filename || !fileContent) {
      return res.status(400).json({ error: 'Missing filename or fileContent' });
    }

    // For now, just return success - we'll validate the data arrives
    return res.status(200).json({
      success: true,
      message: 'Entry received',
      filename: filename,
    });

  } catch (error) {
    console.error('Handler error:', error);
    return res.status(500).json({ 
      error: 'Server error',
      message: error.message
    });
  }
}
