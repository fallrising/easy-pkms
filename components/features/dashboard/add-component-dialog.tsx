// File Path: personal-info-manager/components/features/dashboard/add-component-dialog.tsx
'use client';

import { useState } from 'react';
import { Button } from '@/components/common/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/common/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/common/dialog";
import { Input } from '@/components/common/input';
import { Label } from '@/components/common/label';
import { Component, ComponentType } from '@/api/types/dashboard';
import { NewComponent } from '@/components/features/dashboard/types/newComponent';
import { ChartSettings, TableSettings, QuoteSettings, ImageSettings, CartesianChartSettings, PieChartSettings } from '@/api/types/dashboard';

type ComponentSettings = ChartSettings | TableSettings | QuoteSettings | ImageSettings;

function getDefaultChartSettings(data: Record<string, any>): ChartSettings {
  const chartType = data.type || 'bar';
  if (chartType === 'pie') {
    return {
      type: 'pie',
      title: data.title || 'New Pie Chart',
      dataKey: 'value',
      nameKey: 'category',
      showLegend: data.showLegend ?? true,
      data: [
        { category: 'A', value: 10 },
        { category: 'B', value: 20 },
        { category: 'C', value: 30 },
      ],
      colors: ['#0088FE', '#00C49F', '#FFBB28']
    };
  }

  return {
    type: chartType as 'bar' | 'line' | 'area',
    title: data.title || 'New Chart',
    xAxisKey: data.xAxisKey || 'category',
    showGrid: data.showGrid ?? true,
    showLegend: data.showLegend ?? true,
    series: [{
      dataKey: 'value',
      name: 'Value',
      color: '#8884d8'
    }],
    data: [
      { category: 'A', value: 10 },
      { category: 'B', value: 20 },
      { category: 'C', value: 30 },
    ]
  };
}

function getDefaultTableSettings(data: Record<string, any>): TableSettings {
  return {
    columns: data.columns || ['Column 1', 'Column 2'],
    data: data.data || [
      ['Row 1, Col 1', 'Row 1, Col 2'],
      ['Row 2, Col 1', 'Row 2, Col 2'],
    ]
  };
}

function getDefaultQuoteSettings(data: Record<string, any>): QuoteSettings {
  return {
    text: data.text || 'Enter your quote here',
    author: data.author || 'Author Name'
  };
}

function getDefaultImageSettings(data: Record<string, any>): ImageSettings {
  return {
    src: data.src || '/api/placeholder/300/200',
    alt: data.alt || 'Placeholder image',
    title: data.title || 'New Image'
  };
}

function getDefaultSettings(type: ComponentType, data: Record<string, any>): ComponentSettings {
  switch (type) {
    case 'Chart':
      return getDefaultChartSettings(data);
    case 'Table':
      return getDefaultTableSettings(data);
    case 'Quote':
      return getDefaultQuoteSettings(data);
    case 'Image':
      return getDefaultImageSettings(data);
    default:
      throw new Error(`Unsupported component type: ${type}`);
  }
}


interface AddComponentDialogProps {
  onClose: () => void;
  onAddComponent: (component: NewComponent) => void;
}

export function AddComponentDialog({ onClose, onAddComponent }: AddComponentDialogProps) {
  const [componentType, setComponentType] = useState<ComponentType | undefined>();
  const [formData, setFormData] = useState<Record<string, any>>({});

  const handleAddComponent = () => {
    if (!componentType) return;

    const settings = getDefaultSettings(componentType, formData);
    const newComponent: NewComponent = {
      type: componentType,
      settings
    };

    onAddComponent(newComponent);
    onClose();
  };

  const handleFormChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const renderFormFields = () => {
    switch (componentType) {
      case 'Chart':
        return (
            <>
              <div className="space-y-2">
                <Label>Chart Type</Label>
                <Select onValueChange={(value) => handleFormChange('type', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select chart type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bar">Bar</SelectItem>
                    <SelectItem value="line">Line</SelectItem>
                    <SelectItem value="area">Area</SelectItem>
                    <SelectItem value="pie">Pie</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Title</Label>
                <Input
                    type="text"
                    placeholder="Enter chart title"
                    onChange={(e) => handleFormChange('title', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>X-Axis Key</Label>
                <Input
                    type="text"
                    placeholder="Enter X-Axis key"
                    onChange={(e) => handleFormChange('xAxisKey', e.target.value)}
                />
              </div>
            </>
        );
      case 'Table':
        return (
            <>
              <div className="space-y-2">
                <Label>Columns</Label>
                <Input
                    type="text"
                    placeholder="Enter columns (comma separated)"
                    onChange={(e) => handleFormChange('columns', e.target.value.split(','))}
                />
              </div>
              <div className="space-y-2">
                <Label>Data</Label>
                <Input
                    type="text"
                    placeholder="Enter data (comma separated)"
                    onChange={(e) => handleFormChange('data', e.target.value.split(','))}
                />
              </div>
            </>
        );
      case 'Quote':
        return (
            <>
              <div className="space-y-2">
                <Label>Quote Text</Label>
                <Input
                    type="text"
                    placeholder="Enter quote text"
                    onChange={(e) => handleFormChange('text', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Author</Label>
                <Input
                    type="text"
                    placeholder="Enter author name"
                    onChange={(e) => handleFormChange('author', e.target.value)}
                />
              </div>
            </>
        );
      case 'Image':
        return (
            <>
              <div className="space-y-2">
                <Label>Image URL</Label>
                <Input
                    type="text"
                    placeholder="Enter image URL"
                    onChange={(e) => handleFormChange('src', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Alt Text</Label>
                <Input
                    type="text"
                    placeholder="Enter alt text"
                    onChange={(e) => handleFormChange('alt', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Title</Label>
                <Input
                    type="text"
                    placeholder="Enter image title"
                    onChange={(e) => handleFormChange('title', e.target.value)}
                />
              </div>
            </>
        );
      default:
        return null;
    }
  };

  return (
      <Dialog open={true} onOpenChange={onClose}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Component</DialogTitle>
            <DialogDescription>
              Choose a component type and fill in the form to add it to your dashboard.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Component Type</Label>
              <Select onValueChange={(value) => setComponentType(value as ComponentType)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select component type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Chart">Chart</SelectItem>
                  <SelectItem value="Table">Table</SelectItem>
                  <SelectItem value="Quote">Quote</SelectItem>
                  <SelectItem value="Image">Image</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {renderFormFields()}
            <Button onClick={handleAddComponent} disabled={!componentType}>
              Add Component
            </Button>
          </div>
        </DialogContent>
      </Dialog>
  );
}