"use client";
import Avatar1 from "@/app/avatars/Mask Group (1).png";
import Avatar2 from "@/app/avatars/Mask Group (2).png";
import Avatar3 from "@/app/avatars/Mask Group (3.png";
import Avatar4 from "@/app/avatars/Mask Group (4).png";
import Avatar5 from "@/app/avatars/Mask Group (5).png";
import Avatar6 from "@/app/avatars/Mask Group (6).png";
import Avatar7 from "@/app/avatars/Mask Group (7).png";
import { StaticImageData } from "next/image";
import Image from "next/image";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export interface StaffData {
  id?: number;
  firstName?: string;
  lastName?: string;
  avatar?: StaticImageData | null;
}

const StaffForm = ({ onSubmit, initialData = {} as StaffData }: { onSubmit: (data: StaffData) => void, initialData?: StaffData }) => {
  const [step, setStep] = useState(1);
  const avatars: StaticImageData[] = [Avatar1, Avatar2, Avatar3, Avatar4, Avatar5, Avatar6, Avatar7];

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    avatar: avatars.length > 0 ? avatars[0] : null,
    ...initialData,
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.firstName || !formData.lastName || !formData.avatar) {
      alert("Please complete all fields!");
      return;
    }
    if (step === 1) {
      setStep(2);
    } else {
      onSubmit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {step === 1 ? (
        <>
          <Input
            placeholder="First Name"
            value={formData.firstName}
            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
            required
          />
          <Input
            placeholder="Last Name"
            value={formData.lastName}
            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
            required
          />
        </>
      ) : (
        <div>
          <h3 className="mb-4">Choose an Avatar</h3>
          <div className="grid grid-cols-4 gap-4">
            {avatars.length > 0 ? (
              avatars.map((avatar, index) => (
                <button
                  key={index}
                  type="button"
                  className={`w-12 h-12 rounded-full overflow-hidden border 
                    ${formData.avatar === avatar ? 'ring-2 ring-offset-2 ring-blue-500' : ''}`}
                  onClick={() => setFormData({ ...formData, avatar })}
                >
                  <Image
                    src={avatar}
                    alt="Avatar"
                    className="object-cover w-full h-full"
                    width={48}
                    height={48}
                  />
                </button>
              ))
            ) : (
              <p>No avatars available</p>
            )}
          </div>
        </div>
      )}
      <Button type="submit" className="w-full">
        {step === 1 ? 'Next' : (initialData.id ? 'Update Staff Member' : 'Add Staff Member')}
      </Button>
    </form>
  );
};

export default StaffForm;
