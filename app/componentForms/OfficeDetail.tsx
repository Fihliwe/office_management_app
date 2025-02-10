'use client'; 
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { ArrowLeft, Search, MoreVertical } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { StaticImageData } from 'next/image';
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import saveOffices from "../localStorage/saveOffices";
import getStoredOffices from "../localStorage/getStoredOffices";
import StaffForm from "./StaffForm";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const OfficeDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [offices, setOffices] = useState(getStoredOffices());
    const [showAddStaffDialog, setShowAddStaffDialog] = useState(false);
    const [showEditStaffDialog, setShowEditStaffDialog] = useState(false);
    const [selectedStaffMember, setSelectedStaffMember] = useState<{ id: number; firstName: string; lastName: string; avatar?: StaticImageData | null } | null>(null);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [showDeletedOffice, setShowDeletedOffice] = useState(false);
    const [showEditOffice, setShowEditOffice] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
  
    const office = id ? offices.find((o: { id: number; staffMembers: any[]; color: string; name: string }) => o.id === parseInt(id)) : null;
  
    useEffect(() => {
      saveOffices(offices);
    }, [offices]);
  
    if (!office) {
      return <div>Office not found</div>;
    }
  
    const filteredStaffMembers = office.staffMembers.filter((staff: { firstName: string; lastName: string }) =>
      `${staff.firstName} ${staff.lastName}`.toLowerCase().includes(searchTerm.toLowerCase())
    );
  
    const handleAddStaffMember = (staffData: {}) => {
      const updatedOffices = offices.map((o: { id: number; staffMembers: any[] }) => {
        if (o.id === office.id) {
          return {
            ...o,
            staffMembers: [...o.staffMembers, { ...staffData, id: Date.now() }]
          };
        }
        return o;
      });
      setOffices(updatedOffices);
      setShowAddStaffDialog(false);
    };
  
    const handleEditStaffMember = (staffData: {}) => {
      const updatedOffices = offices.map((o: { id: number; staffMembers: any[] }) => {
        if (o.id === office.id) {
          return {
            ...o,
            staffMembers: o.staffMembers.map(staff => 
              selectedStaffMember && staff.id === selectedStaffMember.id ? { ...staff, ...staffData } : staff
            )
          };
        }
        return o;
      });
      setOffices(updatedOffices);
      setShowEditStaffDialog(false);
      setSelectedStaffMember(null);
    };
  
    const handleDeleteStaffMember = () => {
      const updatedOffices = offices.map((o: { id: number; staffMembers: any[] }) => {
        if (o.id === office.id) {
          return {
            ...o,
            staffMembers: o.staffMembers.filter(staff => selectedStaffMember && staff.id !== selectedStaffMember.id)
          };
        }
        return o;
      });
      setOffices(updatedOffices);
      setShowDeleteConfirm(false);
      setSelectedStaffMember(null);
    };

    const handleDeleteOffice = () => {
      const updatedOffices = offices.map((o: { id: number; staffMembers: any[] }) => {
        if (o.id === office.id) {
          return {
            ...o,
            staffMembers: o.staffMembers.filter(staff => selectedStaffMember && staff.id !== selectedStaffMember.id)
          };
        }
        return o;
      });
      setOffices(updatedOffices);
      setShowDeletedOffice(false);
      setSelectedStaffMember(null);
    };

    return (
      <div className="max-w-md mx-auto bg-gray-50 min-h-screen">
        <header className="bg-white p-4 flex items-center gap-4">
          <ArrowLeft className="w-6 h-6 cursor-pointer" onClick={() => navigate('/')} />
          <h1 className="text-xl font-semibold">Office</h1>
        </header>
  
        <div className="p-4">
          <div className="bg-white rounded-lg p-4 mb-4">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-1 h-12 rounded-full" style={{ backgroundColor: office.color }} />
              <div>
                <h2 className="font-semibold">{office.name}</h2>
                <p className="text-sm text-gray-500">
                  {office.staffMembers.length} Staff Members in Office
                </p>
              </div>
            </div>
  
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                className="pl-10"
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
  
            <div className="space-y-4">
              {filteredStaffMembers.map((staff: { id: number; firstName: string; lastName: string; avatar?: StaticImageData | null }) => (
                <div key={staff.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                      {staff.avatar ? <img src={staff.avatar.src} alt={`${staff.firstName} ${staff.lastName}`} className="w-10 h-10 rounded-full" /> : <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">{staff.firstName[0]}{staff.lastName[0]}</div>}
                    </div>
                    <span>{staff.firstName} {staff.lastName}</span>
                  </div>
                  <DropdownMenu>
                  <DropdownMenuTrigger><MoreVertical className="w-4 h-4" /></DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>
                      <Button
                      variant="ghost"
                      onClick={() => {
                        setShowDeleteConfirm(true);
                        setSelectedStaffMember(staff);
                      }}
                    >Delete Staff</Button>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <Button
                      variant="ghost"
                      onClick={() => {
                        setSelectedStaffMember(staff);
                        setShowEditStaffDialog(true);
                      }}
                    >Edit Staff</Button>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                </div>
              ))}
            </div>
          </div>
  
          <Button
            className="fixed bottom-4 right-4 rounded-full w-12 h-12 p-0"
            onClick={() => setShowAddStaffDialog(true)}
          >
            +
          </Button>
        </div>

        <Dialog open={showAddStaffDialog} onOpenChange={setShowAddStaffDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Staff Member</DialogTitle>
            </DialogHeader>
            <StaffForm onSubmit={handleAddStaffMember} />
          </DialogContent>
        </Dialog>

        <Dialog open={showEditStaffDialog} onOpenChange={setShowEditStaffDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Staff Member</DialogTitle>
            </DialogHeader>
            <StaffForm onSubmit={handleEditStaffMember} initialData={selectedStaffMember || undefined} />
          </DialogContent>
        </Dialog>

        <AlertDialog open={showDeleteConfirm} onOpenChange={setShowDeleteConfirm}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete the staff member.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleDeleteStaffMember}>Delete</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
  );
};

export default OfficeDetail;