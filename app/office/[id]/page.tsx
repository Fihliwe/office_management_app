'use client';
import { useParams } from 'next/navigation';

export default function OfficeDetail() {
  const { id } = useParams();

  return (
    <div>
      <h1>Office Detail - {id}</h1>
    </div>
  );
}
