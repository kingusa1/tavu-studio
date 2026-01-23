import React from 'react';
import Image from 'next/image';

export default function Logo({ className }: { className?: string }) {
  return (
    <Image 
      src="/logo.png" 
      alt="TAVÚ Logo"
      width={144}
      height={32}
      className={className}
    />
  );
}
