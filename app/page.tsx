import { redirect } from 'next/navigation';

export default function RootPage() {
  // Varsayılan olarak Türkçe'ye yönlendir
  redirect('/tr');
}
