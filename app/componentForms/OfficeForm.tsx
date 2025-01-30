'use client';
import React from "react";
import { useState } from "react";
import { Button} from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface OfficeData {
  id?: string;
  name: string;
  address: string;
  email: string;
  phone: string;
  capacity: string;
  color: string;
}

const OfficeForm = ({ onSubmit, initialData = {} as OfficeData }: { onSubmit: (data: OfficeData) => void, initialData?: OfficeData }) => {
    const [formData, setFormData] = useState({
      ...initialData
    });
  
    const officeColors = [
      '#F59E0B', '#FB923C', '#EF4444', '#78350F', '#EC4899', '#DC2626',
      '#2DD4BF', '#22C55E', '#0EA5E9', '#3B82F6', '#6366F1'
    ];
  
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      onSubmit(formData);
    };
  
    return (
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          placeholder="Office Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
        <Input
          placeholder="Physical Address"
          value={formData.address}
          onChange={(e) => setFormData({ ...formData, address: e.target.value })}
          required
        />
        <Input
          type="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
        />
        <Input
          placeholder="Phone Number"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          required
        />
        <Input
          type="number"
          placeholder="Maximum Capacity"
          value={formData.capacity}
          onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
          required
        />
        <div>
          <h3 className="mb-2">Office Colour</h3>
          <div className="grid grid-cols-6 gap-2">
            {officeColors.map((color) => (
              <button
                key={color}
                type="button"
                className={`w-8 h-8 rounded-full ${formData.color === color ? 'ring-2 ring-offset-2 ring-blue-500' : ''}`}
                style={{ backgroundColor: color }}
                onClick={() => setFormData({ ...formData, color })}
              />
            ))}
          </div>
        </div>
        <Button type="submit" className="w-full">
          {initialData.id ? 'Update Office' : 'Add Office'}
        </Button>
      </form>
    );
  };

export default OfficeForm;