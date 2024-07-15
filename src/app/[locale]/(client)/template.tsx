import AskGrandpa from "@/components/AskGrandpa/AskGrandpa";

export default function Template({ children }: { children: React.ReactNode }) {
    return <div>
        {children}
        <AskGrandpa />
    </div>
  }