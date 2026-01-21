/**
 * Quick API Test Script
 * 
 * Run this with: node test-api.js
 * Make sure your Next.js dev server is running on port 3000
 */

async function testCarValue() {
  const testCases = [
    {
      name: 'Test 1: BMW 430 (2024)',
      data: {
        year: 2024,
        make: 'bmw',
        model: '430',
        mileage: 20000,
        trim: 'xDrive'
      }
    },
    {
      name: 'Test 2: Without Trim',
      data: {
        year: 2024,
        make: 'bmw',
        model: '430',
        mileage: 20000
      }
    },
    {
      name: 'Test 3: Error - Missing Fields',
      data: {
        year: 2024,
        make: 'bmw'
        // Missing model and mileage
      }
    }
  ];

  for (const testCase of testCases) {
    console.log(`\n${'='.repeat(50)}`);
    console.log(testCase.name);
    console.log('='.repeat(50));

    try {
      const response = await fetch('http://localhost:3000/api/car-value', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(testCase.data)
      });

      const data = await response.json();
      
      console.log('Status:', response.status);
      
      if (response.ok && data.success) {
        console.log('✅ SUCCESS');
        console.log(`Pre-value: $${data.pre_value?.toLocaleString()}`);
        console.log(`Post-value: $${data.post_value?.toLocaleString()}`);
        console.log(`Diminished: $${data.diminished_value?.toLocaleString()}`);
        console.log(`Pre comps: ${data.pre_comps?.length || 0}`);
        console.log(`Post comps: ${data.post_comps?.length || 0}`);
      } else {
        console.log('❌ FAILED');
        console.log('Error:', data.error || 'Unknown error');
      }
    } catch (error) {
      console.log('❌ ERROR');
      console.log('Message:', error.message);
      console.log('Make sure your Next.js server is running on port 3000');
    }
  }
}

// Run tests
testCarValue().catch(console.error);
