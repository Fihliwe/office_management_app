'use client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import OfficeList from './componentForms/OfficeList';
import OfficeDetail from './componentForms/OfficeDetail';
export default function Home() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<OfficeList />} />
        <Route path="/office/:id" element={<OfficeDetail />} />
      </Routes>
    </BrowserRouter>
  );
}
