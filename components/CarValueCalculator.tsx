/**
 * Example Car Value Calculator Component
 * 
 * Demonstrates how to use the car value calculation in a React component
 */

'use client';

import React, { useState } from 'react';
import { useCarValueCalculation } from '@/hooks/useCarValueCalculation';
import { CarValueChart } from './CarValueChart';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';

export function CarValueCalculator() {
  const { calculate, loading, error, data } = useCarValueCalculation();
  
  const [year, setYear] = useState('');
  const [make, setMake] = useState('');
  const [model, setModel] = useState('');
  const [mileage, setMileage] = useState('');
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

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      <Card>
        <CardHeader>
          <CardTitle>Car Value Calculator</CardTitle>
          <CardDescription>
            Calculate pre-accident, post-accident, and diminished values
          </CardDescription>
        </CardHeader>
        <CardContent>
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
              </div>

              {/* Comparable Listings */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Pre-Accident Comparables ({data.pre_comps.length})</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 max-h-64 overflow-y-auto">
                      {data.pre_comps.map((comp, i) => (
                        <div key={i} className="text-sm border-b pb-2">
                          <p>
                            <strong>Price:</strong> ${(typeof comp.price === 'string' ? parseFloat(comp.price) : comp.price).toLocaleString()}
                          </p>
                          <p>
                            <strong>Mileage:</strong> {(typeof comp.mileage === 'string' ? parseFloat(comp.mileage) : comp.mileage).toLocaleString()} miles
                          </p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Post-Accident Comparables ({data.post_comps.length})</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 max-h-64 overflow-y-auto">
                      {data.post_comps.map((comp, i) => (
                        <div key={i} className="text-sm border-b pb-2">
                          <p>
                            <strong>Price:</strong> ${(typeof comp.price === 'string' ? parseFloat(comp.price) : comp.price).toLocaleString()}
                          </p>
                          <p>
                            <strong>Mileage:</strong> {(typeof comp.mileage === 'string' ? parseFloat(comp.mileage) : comp.mileage).toLocaleString()} miles
                          </p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
