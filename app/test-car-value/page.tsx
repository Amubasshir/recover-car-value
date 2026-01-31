/**
 * Test Page for Car Value Calculator
 * 
 * Visit: http://localhost:3000/test-car-value
 */

'use client';

import { useCarValueCalculation } from '@/hooks/useCarValueCalculation';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CarValueChart } from '@/components/CarValueChart';

export default function TestCarValuePage() {
  const { calculate, loading, error, data } = useCarValueCalculation();
  
  const [year, setYear] = useState('2024');
  const [make, setMake] = useState('bmw');
  const [model, setModel] = useState('430');
  const [mileage, setMileage] = useState('20000');
  const [trim, setTrim] = useState('');

  const handleCalculate = async () => {
    if (!year || !make || !model || !mileage) {
      alert('Please fill in all required fields');
      return;
    }

    await calculate({
      year: parseInt(year),
      make,
      model,
      mileage: parseInt(mileage),
      trim: trim || undefined,
    });
  };

  const quickTest = (testData: any) => {
    setYear(testData.year.toString());
    setMake(testData.make);
    setModel(testData.model);
    setMileage(testData.mileage.toString());
    setTrim(testData.trim || '');
    setTimeout(() => handleCalculate(), 100);
  };

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      <Card>
        <CardHeader>
          <CardTitle>Car Value Calculator - Test Page</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Quick Test Buttons */}
          <div className="mb-6">
            <Label className="mb-2 block">Quick Tests:</Label>
            <div className="flex gap-2 flex-wrap">
              <Button
                size="sm"
                variant="outline"
                onClick={() => quickTest({ year: 2024, make: 'bmw', model: '430', mileage: 20000, trim: 'xDrive' })}
              >
                Test 1: BMW 430
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => quickTest({ year: 2023, make: 'toyota', model: 'camry', mileage: 30000 })}
              >
                Test 2: Toyota Camry
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => quickTest({ year: 2022, make: 'honda', model: 'accord', mileage: 40000 })}
              >
                Test 3: Honda Accord
              </Button>
            </div>
          </div>

          {/* Input Form */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <Label htmlFor="year">Year *</Label>
              <Input
                id="year"
                type="number"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                placeholder="2024"
              />
            </div>
            <div>
              <Label htmlFor="make">Make *</Label>
              <Input
                id="make"
                value={make}
                onChange={(e) => setMake(e.target.value)}
                placeholder="BMW"
              />
            </div>
            <div>
              <Label htmlFor="model">Model *</Label>
              <Input
                id="model"
                value={model}
                onChange={(e) => setModel(e.target.value)}
                placeholder="430"
              />
            </div>
            <div>
              <Label htmlFor="mileage">Mileage *</Label>
              <Input
                id="mileage"
                type="number"
                value={mileage}
                onChange={(e) => setMileage(e.target.value)}
                placeholder="20000"
              />
            </div>
            <div className="col-span-2">
              <Label htmlFor="trim">Trim (Optional)</Label>
              <Input
                id="trim"
                value={trim}
                onChange={(e) => setTrim(e.target.value)}
                placeholder="xDrive"
              />
            </div>
          </div>

          <Button onClick={handleCalculate} disabled={loading} className="w-full">
            {loading ? 'Calculating...' : 'Calculate Values'}
          </Button>

          {error && (
            <Alert variant="destructive" className="mt-4">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {data && (
            <div className="mt-8 space-y-6">
              {/* Results Summary */}
              <Card>
                <CardHeader>
                  <CardTitle>Calculation Results</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <Label className="text-sm text-muted-foreground">Pre-Accident Value</Label>
                      <p className="text-2xl font-bold text-green-600">
                        ${data.pre_value.toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <Label className="text-sm text-muted-foreground">Post-Accident Value</Label>
                      <p className="text-2xl font-bold text-orange-600">
                        ${data.post_value.toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <Label className="text-sm text-muted-foreground">Diminished Value</Label>
                      <p className="text-2xl font-bold text-red-600">
                        ${data.diminished_value.toLocaleString()}
                      </p>
                    </div>
                  </div>

                  {/* Regression Info */}
                  <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <Label className="text-xs text-muted-foreground">Pre-Accident Regression</Label>
                      <p>Slope: {data.pre_regression.slope.toFixed(6)}</p>
                      <p>Intercept: {data.pre_regression.intercept.toFixed(2)}</p>
                    </div>
                    <div>
                      <Label className="text-xs text-muted-foreground">Post-Accident Regression</Label>
                      <p>Slope: {data.post_regression.slope.toFixed(6)}</p>
                      <p>Intercept: {data.post_regression.intercept.toFixed(2)}</p>
                      <p className="mt-1 text-muted-foreground">Post plot: {(data as any).post_plot_generated !== false ? 'Yes' : 'No (fallback 90%)'}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Charts */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <CarValueChart
                  title={`${year} ${make} ${model} — Pre Accident`}
                  comps={data.pre_comps.map(c => ({
                    price: typeof c.price === 'string' ? parseFloat(c.price) : c.price,
                    mileage: typeof c.mileage === 'string' ? parseFloat(c.mileage) : c.mileage,
                  }))}
                  regression={data.pre_regression}
                  currentMileage={parseInt(mileage)}
                  predictedValue={data.pre_value}
                />
                {(data as any).post_plot_generated !== false && (
                  <CarValueChart
                    title={`${year} ${make} ${model} — Post Accident`}
                    comps={data.post_comps.map(c => ({
                      price: typeof c.price === 'string' ? parseFloat(c.price) : c.price,
                      mileage: typeof c.mileage === 'string' ? parseFloat(c.mileage) : c.mileage,
                    }))}
                    regression={data.post_regression}
                    currentMileage={parseInt(mileage)}
                    predictedValue={data.post_value}
                  />
                )}
                {(data as any).post_plot_generated === false && (
                  <Card className="flex items-center justify-center p-6">
                    <p className="text-muted-foreground text-sm">Post-accident chart not generated (&lt;2 comps in 75–90% range; using 90% fallback).</p>
                  </Card>
                )}
              </div>

              {/* Raw JSON Data */}
              <Card>
                <CardHeader>
                  <CardTitle>Raw Response Data</CardTitle>
                </CardHeader>
                <CardContent>
                  <pre className="bg-gray-100 p-4 rounded overflow-auto text-xs">
                    {JSON.stringify(data, null, 2)}
                  </pre>
                </CardContent>
              </Card>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
