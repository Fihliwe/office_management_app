'use client';
import OfficeList from './componentForms/OfficeList';
import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <h1>Office List</h1>
      <OfficeList />
      <Link href="/office/1">Go to Office 1</Link>
    </div>
  );
}
