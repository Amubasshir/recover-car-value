// pages/api/calculate-values.js

import { spawn } from 'child_process';
import path from 'path';
import { writeFile } from 'fs/promises';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { year, make, model, trim, mileage, vin, vehicleId } = req.body;

    // Write the input data to a temporary file
    const inputData = {
      year,
      make,
      model,
      trim,
      mileage,
      vin,
      vehicleId: vehicleId || 'vehicle001'
    };

    const inputPath = path.join(process.cwd(), 'temp', `input_${Date.now()}.json`);
    await writeFile(inputPath, JSON.stringify(inputData));

    // Run the Python script
    const pythonProcess = spawn('python', [
      path.join(process.cwd(), 'scripts', 'recover_value.py'),
      '--year', year,
      '--make', make,
      '--model', model,
      '--mileage', mileage.toString(),
      '--vehicle-id', vehicleId || 'vehicle001',
      '--out', path.join(process.cwd(), 'public', 'charts'),
      '--json', path.join(process.cwd(), 'temp', `output_${Date.now()}.json`)
    ]);

    let stdout = '';
    let stderr = '';

    pythonProcess.stdout.on('data', (data) => {
      stdout += data.toString();
    });

    pythonProcess.stderr.on('data', (data) => {
      stderr += data.toString();
    });

    pythonProcess.on('close', (code) => {
      if (code !== 0) {
        console.error(`Python process exited with code ${code}`);
        console.error(`stderr: ${stderr}`);
        return res.status(500).json({ error: 'Python script execution failed', stderr });
      }

      try {
        // Read the output JSON
        const outputPath = path.join(process.cwd(), 'temp', `output_${Date.now()}.json`);
        const outputData = require(outputPath);
        
        // Return the results
        res.status(200).json({
          success: true,
          data: outputData,
          stdout
        });
      } catch (error) {
        console.error('Error reading output file:', error);
        res.status(500).json({ error: 'Failed to read output file' });
      }
    });

  } catch (error) {
    console.error('API error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}