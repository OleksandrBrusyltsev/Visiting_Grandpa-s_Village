import AskGrandpa from '@/components/AskGrandpa/AskGrandpa'
import { ReactNode } from 'react'

export default function Template({ children }: { children: ReactNode }) {
  return (
    <div>
      {children}
      <AskGrandpa />
    </div>
  )
}
