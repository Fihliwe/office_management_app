'use client';
import { useParams } from 'next/navigation';
import OfficeDetail from '../../componentForms/OfficeDetail';

export default function Home2() {
  const { id } = useParams();

  return (
    <div>
      <OfficeDetail />
    </div>
  );
}
