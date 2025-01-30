'use client';
import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import saveOffices from "../localStorage/saveOffices";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import OfficeForm from "./OfficeForm";
import { ChevronUp, ChevronDown } from "lucide-react";
import getStoredOffices from "../localStorage/getStoredOffices";


const OfficeList = () => {
    const [offices, setOffices] = useState(getStoredOffices());
    const [showAddOfficeDialog, setShowAddOfficeDialog] = useState(false);
    const [showMoreInfo, setShowMoreInfo] = useState<{ [key: number]: boolean }>({});
    const navigate = useNavigate();
  
    useEffect(() => {
      saveOffices(offices);
    }, [offices]);
  
    const handleAddOffice = (officeData: { name: string; color: string; phone: string; email: string; capacity: string; address: string; }) => {
      const newOffice = {
        ...officeData,
        id: Date.now(),
        staffMembers: []
      };
      setOffices([...offices, newOffice]);
      setShowAddOfficeDialog(false);
    };
  
    return (
      <div className="max-w-md mx-auto bg-gray-50 min-h-screen">
        <header className="bg-white p-4">
          <h1 className="text-xl font-semibold">All Offices</h1>
        </header>
  
        <div className="p-4 space-y-4">
          {offices.map((office: { id: number; name: string; color: string; phone: string; email: string; capacity: number; address: string; staffMembers: any[] }) => (
            <Card 
              key={office.id}
              className="p-4 cursor-pointer"
              onClick={() => navigate(`/office/${office.id}`)}
            >
              <div className="flex items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <div className="w-1 h-12 rounded-full" style={{ backgroundColor: office.color }} />
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
                    </svg>
                    <div>
                      <h2 className="font-semibold">{office.name}</h2>
                      <p className="text-sm text-gray-500">
                        {office.staffMembers.length} Staff Members in Office
                      </p>
                    </div>
                  </div>
                  {showMoreInfo[office.id] && (
                    <div className="mt-4 space-y-2 text-sm text-gray-600">
                      <div>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
                      </svg>
                      </div>
                      <p>{office.phone}</p>
                      <p>{office.email}</p>
                      <p>Office Capacity: {office.capacity}</p>
                      <p>{office.address}</p>
                    </div>
                  )}
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowMoreInfo(prev => ({
                      ...prev,
                      [office.id]: !prev[office.id]
                    }));
                  }}
                >
                  {showMoreInfo[office.id] ? <ChevronUp /> : <ChevronDown />}
                </button>
              </div>
            </Card>
          ))}
          <Button
          className="fixed bottom-4 right-4 rounded-full w-12 h-12 p-0 bg-blue-900"
          onClick={() => setShowAddOfficeDialog(true)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>

        </Button>
        </div>
        <Dialog open={showAddOfficeDialog} onOpenChange={setShowAddOfficeDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>New Office</DialogTitle>
            </DialogHeader>
            <OfficeForm onSubmit={handleAddOffice} />
          </DialogContent>
        </Dialog>
      </div>
    );
  };

export default OfficeList;